import { Router } from "express";
import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const apiRouter = Router();

// Middleware to check authentication
export const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// --- AUTH ROUTES ---
apiRouter.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { name, email, password: hashedPassword }
    });

    res.json({ message: "User created", user: { id: user.id, name: user.name, email: user.email } });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

apiRouter.get("/auth/me", requireAuth, async (req: any, res: any) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// --- MENU ROUTES ---
apiRouter.get("/menu", async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        menu_items: {
          where: { isAvailable: true }
        }
      }
    });
    res.json(categories);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// --- RESERVATION ROUTES ---
apiRouter.post("/reservations", async (req: any, res: any) => {
  try {
    const { fullName, mobile, dateTime, guestsCount, notes } = req.body;
    
    // Server-side validation
    if (!/^[0-9]+$/.test(mobile)) return res.status(400).json({ error: "Invalid mobile number" });
    if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(fullName)) return res.status(400).json({ error: "Invalid name format" });

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    let userId = null;
    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
        userId = decoded.id;
      } catch (err) {} // ignore invalid tokens on public submissions
    }

    const reservation = await prisma.reservations.create({
      data: {
        fullName,
        mobile,
        dateTime: new Date(dateTime),
        guestsCount: Number(guestsCount),
        notes,
        userId
      }
    });

    res.json({ message: "Reservation successful", reservation });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.get("/reservations", requireAuth, async (req: any, res: any) => {
  try {
    const reservations = await prisma.reservations.findMany({
      where: req.user.role === "ADMIN" ? {} : { userId: req.user.id },
      orderBy: { dateTime: 'desc' }
    });
    res.json(reservations);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// --- GALLERY ROUTES ---
apiRouter.get("/gallery", async (req, res) => {
  try {
    const galleryItems = await prisma.gallery.findMany();
    res.json(galleryItems);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default apiRouter;
