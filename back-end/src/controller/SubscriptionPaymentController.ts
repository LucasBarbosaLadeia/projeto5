import { Request, Response } from "express";
import { SubscriptionPaymentModel } from "../models/SubscriptionPaymentModel";

export const getAll = async (req: Request, res: Response) => {
  const subscriptionPayments = await SubscriptionPaymentModel.findAll();
  res.send(subscriptionPayments);
};
