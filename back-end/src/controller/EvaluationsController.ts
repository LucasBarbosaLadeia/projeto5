import { Request, Response } from "express";
import EvaluationsModel from "../models/EvaluationsModel";

export const getAll = async (req: Request, res: Response) => {
  const evaluations = await EvaluationsModel.findAll();
  res.send(evaluations);
};
