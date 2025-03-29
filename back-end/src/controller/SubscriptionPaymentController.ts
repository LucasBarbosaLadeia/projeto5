<<<<<<< HEAD
import { Request, Response } from "express"; 
import { SubscriptionPaymentModel } from "../models/SubscriptionPaymentModel";


export const getAll = async (req: Request, res: Response) => {
  const subscriptionPayments = await SubscriptionPaymentModel.findAll();
  res.send(subscriptionPayments);
=======
import { Request, Response } from "express"; 
import { SubscriptionPaymentModel } from "../models/SubscriptionPaymentModel";


export const getAll = async (req: Request, res: Response) => {
  const subscriptionPayments = await SubscriptionPaymentModel.findAll();
  res.send(subscriptionPayments);
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
};