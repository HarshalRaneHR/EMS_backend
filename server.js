import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRoute.js";
import departmentRouter from "./router/departmentRoute.js";
import empRouter from "./router/empRoute.js";
import salaryRouter from "./router/salaryRoute.js";
import LeaveRouter from "./router/leaveRoute.js";
import SettingRouter from "./router/SettingRoute.js";
import DashboardRouter from "./router/dashboard.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://ems-frontend-sooty-seven.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/employees", empRouter);
app.use("/api/v1/salary", salaryRouter);
app.use("/api/v1/leave", LeaveRouter);
app.use("/api/v1/setting", SettingRouter);
app.use("/api/v1/dashboard", DashboardRouter);

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
