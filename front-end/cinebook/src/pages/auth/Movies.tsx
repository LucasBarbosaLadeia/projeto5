import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import "./Movies.css";
import { Evaluation } from "../../types/Evaluation";
import Header from "../../components/Header";

import FilmDetails from "../../components/FilmDetails";
import { Film } from "../../types/Film";
import TextInput from "../../components/TextInput"; // Novo import
import CommentsCard from "../../components/CommentsCard";

const Movies = () => {
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Film | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [favorited, setFavorited] = useState(false);
  const [newComment, setNewComment] = useState("");

  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get<Film>(`/films/${id}`);
      setMovie(data);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvaluations = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/evaluations?id_film=${id}`);
      setEvaluations(data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfFavorited = async () => {
    try {
      const { data } = await api.get("/favorites", {
        params: { id_user: userId, id_film: Number(id) },
      });
      if (data?.favorited || data.length > 0) {
        setFavorited(true);
      }
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
    }
  };

  const favoriteMovie = async () => {
    try {
      await api.post("/favorites", {
        id_user: userId,
        id_film: Number(id),
      });
      setFavorited(true);
    } catch (error) {
      console.error("Erro ao favoritar filme:", error);
    }
  };

  const handleDelete = async (id_evaluation: number) => {
    try {
      await api.delete(`/evaluations/${id_evaluation}`);
      setEvaluations((prev) =>
        prev.filter((e) => e.id_evaluation !== id_evaluation)
      );
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };

  const handleEdit = async (id_evaluation: number, newComment: string) => {
    try {
      await api.put(`/evaluations/${id_evaluation}`, { comment: newComment });
      setEvaluations((prev) =>
        prev.map((e) =>
          e.id_evaluation === id_evaluation ? { ...e, comment: newComment } : e
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
    }
  };

  const handleCreateComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await api.post(`/films/${id}/comments`, {
        comment: newComment,
      });
      const created = response.data.comment;
      setEvaluations((prev) => [...prev, created]);
      setNewComment("");
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
      fetchEvaluations();
      checkIfFavorited();
    }
  }, [id]);

  if (isLoading) return <div>Carregando...</div>;
  if (!movie) return <div>Filme não encontrado.</div>;

  return (
    <div className="movie-container">
      <Header />

      <FilmDetails
        movie={movie}
        favorited={favorited}
        onFavorite={favoriteMovie}
      />

      <div className="movie-evaluations">
        <h2 style={{ color: "red" }}>Comentários:</h2>

        {/* Comentário com TextInput genérico */}
        <div className="mb-4">
          <TextInput
            label="Adicionar Comentário"
            name="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            placeholder="Escreva seu comentário aqui..."
            rows={3}
          />
          <button
            onClick={handleCreateComment}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Adicionar Comentário
          </button>
        </div>

        {evaluations.length === 0 ? (
          <p>Sem comentários ainda.</p>
        ) : (
          evaluations.map((evaluation) => (
            <CommentsCard
              key={evaluation.id_evaluation}
              evaluation={evaluation}
              isOwner={evaluation.id_user === Number(userId)}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;

