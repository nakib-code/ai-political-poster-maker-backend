import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);


app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Political Poster API is running",
  });
});


app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;