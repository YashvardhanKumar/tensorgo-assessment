import e, { Request, Response } from "express";
import AuthService from "./auth.services";

export const googleLoginCallback = async (req: Request, res: Response) => {
  //@ts-ignore
  const user = await AuthService.searchByEmail(req.user._json.email);
  if (user.data.length == 0) {
    await AuthService.createUser(req.user);
  }
  //@ts-ignore
  res.redirect(`${process.env.FRONTEND_URL}/?email=${req.user._json.email}`);
};

export const googleLogout = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout((err: any) => {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.json({ operation: true });
          }
        });
      }
}

export const getUser = async (req: Request, res: Response) => {
  const data = await AuthService.searchByEmail(req.body.email);
  res.status(200).json(data);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AuthService.searchById(id);
  res.status(200).json(data);
};
