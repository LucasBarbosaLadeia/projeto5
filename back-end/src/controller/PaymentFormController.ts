import { Request, Response } from "express"; 
import PaymentFormModel from "../models/PaymentFormModel";



export const getAll = async (req: Request, res: Response) => {
  const paymentForms = await PaymentFormModel.findAll();
  res.send(paymentForms);
};