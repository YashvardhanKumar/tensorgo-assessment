import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { json } from "body-parser";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});