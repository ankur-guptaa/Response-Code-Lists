import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import authRoute from "./routes/authRoute.js";
import functionRoute from "./routes/functionRoute.js";
import updateDbRoute from "./routes/updateDbRoute.js";

dotenv.config();
mongoose.connect(process.env.CONNECTMONGODB);
const app = express();
app.use(cors({ origin: process.env.CLIENTURL }))
app.use(express.json());

// setInterval(async () => {
//     const res = await axios.get("");
//     console.log(res.data);
// }, 420000)

app.get("/test", (req, res) => {
    res.status(200).send("RUNNING");
})
app.use("/auth", authRoute);
app.use("/function", functionRoute);
app.use("/update_db", updateDbRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on Pont " + process.env.PORT);
})