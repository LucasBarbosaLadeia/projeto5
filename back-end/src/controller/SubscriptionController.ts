<<<<<<< HEAD
import { Request, Response } from "express"; 
import SubscriptionModel from "../models/SubscriptionModel";


export const getAll = async (req: Request, res: Response) => {
  const subscriptions = await SubscriptionModel.findAll();
  res.send(subscriptions);
=======
import { Request, Response } from "express"; 
import SubscriptionModel from "../models/SubscriptionModel";


export const getAll = async (req: Request, res: Response) => {
  const subscriptions = await SubscriptionModel.findAll();
  res.send(subscriptions);
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
};