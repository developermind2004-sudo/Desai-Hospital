import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import doctorsCrudRouter from "./routes/doctorsRoute.js";
import profileRouter from "./routes/profileRoute.js";
import reportRouter from "./routes/reportRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/doctors", doctorsCrudRouter);
app.use("/api/user", userRouter);
app.use("/api", profileRouter);
app.use("/api", reportRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

const start = async () => {
  try {
    await connectDB();
    connectCloudinary();
    app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
