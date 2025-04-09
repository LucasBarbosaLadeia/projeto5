import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import { addFavoriteToUser } from "../services/FavoriteService";
import FilmModel from "../models/FilmModel";
import { z } from "zod";

export const createFavorite = async (req: Request, res: Response) => {
  try {
    console.log("Body recebido:", req.body);
    const { id_user, id_film } = req.body;

    // Simples verificação básica
    if (!id_user || !id_film) {
      return res
        .status(400)
        .json({ error: "id_user e id_film são obrigatórios" });
    }

    const newFavorite = await FavoritesModel.create({ id_user, id_film });

    return res.status(201).json({
      message: "Favorito criado com sucesso",
      favorite: newFavorite,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const favorites = await FavoritesModel.findAll();
    res.send(favorites);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};

export const addFavoriteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // ID do filme a ser favoritado
    const id_user = req.user?.user?.id_user; // Obtém o usuário autenticado do token

    if (!id_user) {
      return res.status(401).json({ error: "Token não fornecido ou inválido" });
    }

    console.log("Recebendo dados para favoritar:", {
      filmID: id,
      userID: id_user,
    });

    const newFavorite = await FavoritesModel.create({
      id_user: Number(id_user),
      id_film: Number(id),
    });

    return res.status(201).json({
      message: "Filme favoritado com sucesso!",
      favorite: newFavorite,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id_user, id_film } = req.query;

    if (!id_user || !id_film) {
      return res
        .status(400)
        .json({ error: "id_user e id_film são obrigatórios" });
    }

    // Verifica se o filme e o usuário estão sendo passados corretamente
    console.log("Recebendo dados para favoritar:", {
      filmID: id_film,
      userID: id_user,
    });

    const favorite = await FavoritesModel.findOne({
      where: {
        id_user: Number(id_user),
        id_film: Number(id_film),
      },
    });

    if (favorite) {
      return res.status(200).json({ favorited: true });
    } else {
      return res.status(200).json({ favorited: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};

export const getFavoriteFilmsByUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id_user = req.user?.user?.id_user; // Obtém o usuário autenticado do token
    console.log("Recebendo filmes favoritos do usuário:", id_user);

    if (!id_user) {
      return res.status(401).json({ error: "Token não fornecido ou inválido" });
    }

    const favoriteFilms = await FavoritesModel.findAll({
      where: { id_user: id_user },
      include: [
        {
          model: FilmModel,
          as: "film",
          required: true,
          attributes: [
            "id_film",
            "name",
            "description",
            "launch_date",
            "images",
          ],
        },
      ],
    });

    if (favoriteFilms.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum filme favorito encontrado." });
    }

    res.status(200).json({
      message: "Filmes favoritos encontrados com sucesso.",
      favoriteFilms: favoriteFilms.map((favorite) => favorite.film),
    });
  } catch (error) {
    console.error("Erro ao buscar filmes favoritos:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao buscar filmes favoritos.",
    });
  }
};
