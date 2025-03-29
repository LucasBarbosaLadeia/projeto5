import { Request, Response } from "express";
import SubscriptionModel from "../models/SubscriptionModel";

export const getAll = async (req: Request, res: Response) => {
  const subscriptions = await SubscriptionModel.findAll();
  res.send(subscriptions);
};
