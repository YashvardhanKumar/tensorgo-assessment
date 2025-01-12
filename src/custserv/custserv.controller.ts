import { Request, Response } from "express";
import CustServService from "./custserv.services";

export const createServ = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { userId, comments, category } = req.body;
    await CustServService.createService(userId, comments, category);
    res.status(200).json({ message: "Service created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getServByContactId = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    
    const data = await CustServService.getConversationByContactId(
      req.body.userId
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getServById = async (req: Request, res: Response) => {
  try {
    const { id: conversation_id } = req.params;
    const data = await CustServService.getConversationById(conversation_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
