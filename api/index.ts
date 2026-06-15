import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const apiRouter = Router();

// Validate critical env vars
if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
  console.warn("WARNING: JWT_SECRET is not set in production!");
}

const JWT_SECRET = process.env.JWT_SECRET || "development_secret_do_not_use_in_prod";

// Rate Limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: { error: "Too many login attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many accounts created, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const reservationsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: { error: "Too many reservations from this IP, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Zod Validation Schemas
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const reservationSchema = z.object({
  fullName: z.string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  mobile: z.string()
    .min(9, "Mobile must be at least 9 digits")
    .regex(/^[0-9]+$/, "Mobile must contain only digits"),
  dateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  guestsCount: z.number().int().positive(),
  notes: z.string().optional(),
});

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive(),
  image: z.string().optional(),
  categoryId: z.number().int().positive(),
  isAvailable: z.boolean().optional(),
});

const galleryItemSchema = z.object({
  title: z.string().optional(),
  imageUrl: z.string().min(1, "Image URL is required"),
  category: z.string().optional(),
});

// Validation Middleware Helper
const validateRequest = (schema: z.ZodTypeAny) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
    next(e);
  }
};

// Middleware to check authentication
export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware to check role
export const requireRole = (roles: string[]) => (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: insufficient permissions" });
  }
  next();
};

// --- AUTH ROUTES ---
apiRouter.post("/auth/register", registerLimiter, validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { name, email, password: hashedPassword }
    });

    res.json({ message: "User created", user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    next(e);
  }
});

apiRouter.post("/auth/login", loginLimiter, validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (e) {
    next(e);
  }
});

apiRouter.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

apiRouter.get("/auth/me", requireAuth, async (req: any, res: any, next) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (e) {
    next(e);
  }
});

// --- MENU ROUTES ---
apiRouter.get("/menu", async (req, res, next) => {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        menu_items: {
          where: { isAvailable: true }
        }
      }
    });
    res.json(categories);
  } catch (e) {
    next(e);
  }
});

apiRouter.post("/menu/items", requireAuth, requireRole(["ADMIN"]), validateRequest(menuItemSchema), async (req: any, res: any, next) => {
  try {
    const item = await prisma.menu_items.create({ data: req.body });
    res.json({ message: "Menu item created", item });
  } catch (e) {
    next(e);
  }
});

apiRouter.delete("/menu/items/:id", requireAuth, requireRole(["ADMIN"]), async (req: any, res: any, next) => {
  try {
    await prisma.menu_items.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Menu item deleted" });
  } catch (e) {
    next(e);
  }
});

// --- RESERVATION ROUTES ---
apiRouter.post("/reservations", reservationsLimiter, validateRequest(reservationSchema), async (req: any, res: any, next: NextFunction) => {
  try {
    const { fullName, mobile, dateTime, guestsCount, notes } = req.body;
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    let userId = null;
    if (token) {
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (err) {}
    }

    const reservation = await prisma.reservations.create({
      data: {
        fullName,
        mobile,
        dateTime: new Date(dateTime),
        guestsCount,
        notes,
        userId
      }
    });

    res.json({ message: "Reservation successful", reservation });
  } catch (e) {
    next(e);
  }
});

apiRouter.get("/reservations", requireAuth, async (req: any, res: any, next) => {
  try {
    const reservations = await prisma.reservations.findMany({
      where: req.user.role === "ADMIN" || req.user.role === "STAFF" ? {} : { userId: req.user.id },
      orderBy: { dateTime: 'desc' }
    });
    res.json(reservations);
  } catch (e) {
    next(e);
  }
});

apiRouter.patch("/reservations/:id/status", requireAuth, requireRole(["ADMIN", "STAFF"]), async (req: any, res: any, next) => {
  const statusSchema = z.object({ status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]) });
  
  try {
    const { status } = statusSchema.parse(req.body);
    const reservation = await prisma.reservations.update({
      where: { id: Number(req.params.id) },
      data: { status }
    });
    res.json(reservation);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
    next(e);
  }
});

// --- GALLERY ROUTES ---
apiRouter.get("/gallery", async (req, res, next) => {
  try {
    const galleryItems = await prisma.gallery.findMany();
    res.json(galleryItems);
  } catch (e) {
    next(e);
  }
});

apiRouter.post("/gallery", requireAuth, requireRole(["ADMIN"]), validateRequest(galleryItemSchema), async (req: any, res: any, next) => {
  try {
    const item = await prisma.gallery.create({ data: req.body });
    res.json({ message: "Gallery image added", item });
  } catch (e) {
    next(e);
  }
});

// --- SETTINGS (ADMIN) ---
apiRouter.post("/settings", requireAuth, requireRole(["ADMIN"]), async (req: any, res: any, next) => {
  try {
    const schema = z.object({ key: z.string(), value: z.string() });
    const { key, value } = schema.parse(req.body);

    const setting = await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    res.json(setting);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
    next(e);
  }
});

export default apiRouter;
