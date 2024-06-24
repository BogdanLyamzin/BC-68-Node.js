import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import authRouter from "./routes/authRouter.js";
import genresRouter from "./routes/genresRouter.js";
import moviesRouter from "./routes/moviesRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/genres", genresRouter);
app.use("/api/movies", moviesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const {DB_HOST} = process.env;

mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

