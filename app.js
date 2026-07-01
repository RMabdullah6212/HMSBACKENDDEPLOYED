import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { dbConnection } from "./Database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

if (process.env.NODE_ENV !== "production") {
  config({ path: "./config/config.env" });
}

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, process.env.DASHBOARD_URL].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    const allowAllOrigins = allowedOrigins.length === 0;
    if (!origin || allowAllOrigins || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management Backend is Running Successfully",
  });
});

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

await dbConnection();

app.use(errorMiddleware);

export default app;