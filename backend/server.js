import express from "express";
import colors from "colors";
import cors from "cors";
import * as fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

///database
mongoose
  .connect(process.env.MONGODB_DATABASE_URL)
  .then(() => console.log("Database Connected Successfully".bgMagenta.white))
  .catch((err) => console.log("error in connecting database".bgRed, err));

fs.readdirSync("./routes").map(async (r) => {
  let route = await import("./routes/" + r);
  app.use("/", route.default);
});

app.get("/", (req, res) => {
  res.send("welcome from home");
});
app.get("/books", (req, res) => {
  res.send("books");
});

const port = process.env.PORT;
app.listen(port || 8000, () => {
  console.log(`server is lestining... on port ${port}`.bgCyan.white);
});
