import express from "express";
const app = express();
app.use(express.json());
import authRouter from "./routes/userRoutes.js";

app.use("/api/users", authRouter);

app.listen(8080, () => {
  console.log("server started");
});
