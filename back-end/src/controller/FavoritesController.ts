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
      return res.status(400).json({ error: "id_user e film_id são obrigatórios" });
    }

    const newFavorite = await FavoritesModel.create({ id_user, id_film});

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
  const favorites = await FavoritesModel.findAll();
  res.send(favorites);
};

export const addFavoriteController = async (req: Request, res: Response) => {
  const { id } = req.params; // ID do filme a ser favoritado
  const id_user = req.user.user.id_user; // Obtém o usuário autenticado do token

  try {
    if (!id_user) {
      return res.status(401).json({ error: "Token não fornecido ou inválido" });
    }

    // Verifica se o filme e o usuário estão sendo passados corretamente
    console.log("Recebendo dados para favoritar:", {
      filmID: id,
      userID: id_user,
    });

    // Chama a função de serviço para favoritar o filme
    const newFavorite = await addFavoriteToUser(Number(id), id_user);

    // Resposta de sucesso
    return res.status(201).json({
      message: "Filme favoritado com sucesso!",
      favorite: newFavorite,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Erro ao favoritar filme",
    });
  }
};

export const getFavoriteFilmsByUserController = async (
  req: Request,
  res: Response
) => {
  const id_user = req.user.user.id_user;
  console.log("Recebendo filmes favoritos do usuário:", id_user);

  try {
    const favoriteFilms = await FavoritesModel.findAll({
      where: { id_users: id_user },
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
