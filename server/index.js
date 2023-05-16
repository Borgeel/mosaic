import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import peopleRoutes from "./routes/people.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";

connectDb();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello from Homepage"));

app.use("/people", peopleRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
