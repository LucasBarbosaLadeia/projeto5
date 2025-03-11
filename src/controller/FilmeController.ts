import { Request, Response } from "express";
import { FilmeModel } from "../models/FilmeModel";
import exp from "constants";

export const getAll = async (req: Request, res: Response) => {
  const filmes = await FilmeModel.findAll();
  res.send(filmes);
};

export const getFilmeById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const filme = await FilmeModel.findByPk(req.params.id);
  return res.json(filme);
};

export const createFilme = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, ano_lancamento } = req.body;

    if (!nome || nome === "") {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }
    if (!descricao || descricao === "") {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }
    if (!ano_lancamento) {
      return res.status(400).json({ error: "Ano de lançamento é obrigatório" });
    }
    const filme = await FilmeModel.create({ nome, descricao, ano_lancamento });
    res.status(201).json(filme);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateFilme = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { nome, descricao, ano_lancamento } = req.body;
    if (!nome || nome === "") {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }
    if (!descricao || descricao === "") {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }
    if (!ano_lancamento) {
      return res.status(400).json({ error: "Ano de lançamento é obrigatório" });
    }
    const filme = await FilmeModel.findByPk(req.params.id);
    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }
    filme.nome = nome;
    filme.descricao = descricao;
    filme.ano_lancamento = ano_lancamento;
    await filme.save();
    res.status(201).json(filme);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const deleteFilme = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const filme = await FilmeModel.findByPk(req.params.id);
    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }
    await filme.destroy();
    res.status(201).json({ message: "Filme deletado com sucesso" });
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
