<<<<<<< HEAD
import { Request, Response } from "express"; 
import PaymentFormModel from "../models/PaymentFormModel";



export const getAll = async (req: Request, res: Response) => {
  const paymentForms = await PaymentFormModel.findAll();
  res.send(paymentForms);
=======
import { Request, Response } from "express"; 
import PaymentFormModel from "../models/PaymentFormModel";



export const getAll = async (req: Request, res: Response) => {
  const paymentForms = await PaymentFormModel.findAll();
  res.send(paymentForms);
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
};