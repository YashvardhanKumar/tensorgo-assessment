import express from "express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import { json } from "body-parser";
import cors from "cors";
import passport from "passport";
import authRouter from "./src/auth/auth.routes";
import custServ from "./src/custserv/custserv.routes"
const PORT = process.env.PORT || 5050;

const app = express();
app.use(
  cors({
    origin:'http://localhost:3000', 
    credentials:true
})
);
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/service", custServ);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});