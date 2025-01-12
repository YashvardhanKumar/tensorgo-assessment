import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import {
  getUser,
  getUserById,
  googleLoginCallback,
  googleLogout,
} from "./auth.controller";

const router = Router();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/callback",
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((data: any, done: any) => {
  done(null, data);
});

router
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    googleLoginCallback
  )
  .get("/logout", googleLogout);
 
router.post("/getUser", getUser).get("/getUser/:id", getUserById);

export default router;