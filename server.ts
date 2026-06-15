import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import pino from "pino";
import pinoHttp from "pino-http";
import { createServer as createViteServer } from "vite";
import apiRouter from "./api/index.js";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(helmet({
    contentSecurityPolicy: false, // Vite needs inline scripts for HMR
    crossOriginEmbedderPolicy: false,
  }));
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard({ action: "deny" }));
  app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));

  app.use(pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => req.url?.startsWith("/@vite") || req.url?.startsWith("/src") || false,
    },
    serializers: {
      req: (req) => {
        const { password, ...body } = req.raw.body || {}; // Avoid logging passwords
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          body,
        };
      },
    },
  }));

  app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
  }));
  app.use(express.json());
  app.use(cookieParser());

  // Mount API router
  app.use("/api", apiRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error({ err, msg: "Unhandled error", path: req.path });
    
    // Normalize error response
    let statusCode = err.status || 500;
    
    res.status(statusCode).json({
      error: statusCode === 500 ? "Internal Server Error" : err.message,
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

startServer();
