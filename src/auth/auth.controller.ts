import { Request, Response } from "express";
import AuthService from "./auth.services";

export const googleLoginCallback = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = await AuthService.searchByEmail(req.user._json.email);
    if (user.data.length == 0) {
      await AuthService.createUser(req.user);
    }
    // console.log(req.user);
    //@ts-ignore
    res.cookie("email", req.user._json.email);
    res.redirect(`${process.env.FRONTEND_URL}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const googleLogout = async (req: Request, res: Response) => {
  console.log(req.isAuthenticated());
  
  if (req.isAuthenticated()) {
    req.logout((err: any) => {
      if (err) {
        return res.json({ error: err });
      } else {
        res.clearCookie("email");
        res.clearCookie("session.sid")
        return res.json({ operation: true });
      }
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await AuthService.searchByEmail(req.body.email);
    // console.log(data);
    
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await AuthService.searchById(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
