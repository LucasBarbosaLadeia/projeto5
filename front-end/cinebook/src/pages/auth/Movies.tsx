import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import "./Movies.css";
import { Evaluation } from "../../types/Evaluation";
import Header from "../../components/Header";

interface Film {
  id_film: number;
  name: string;
  description: string;
  images: string;
}

const Movies = () => {
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState<Film | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [favorited, setFavorited] = useState(false);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Film>(`/films/${id}`);
      setFilm(data);
      console.log("Filme recebido:", data);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluations = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/evaluations?id_film=${id}`);
      setEvaluations(data);
      console.log("Avaliações recebidas:", data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_evaluation: number) => {
    try {
      await api.delete(`/evaluations/${id_evaluation}`);
      setEvaluations((prev) => prev.filter(e => e.id_evaluation !== id_evaluation));
      console.log("Comentário excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };
  
  const handleEdit = (evaluation: Evaluation) => {
    const newComment = prompt("Edite seu comentário:", evaluation.comment);
    if (newComment && newComment !== evaluation.comment) {
      updateComment(evaluation.id_evaluation, newComment);
    }
  };
  
  const updateComment = async (id_evaluation: number, newComment: string) => {
    try {
      await api.put(`/evaluations/${id_evaluation}`, { comment: newComment });
      setEvaluations((prev) =>
        prev.map(e =>
          e.id_evaluation === id_evaluation ? { ...e, comment: newComment } : e
        )
      );
      console.log("Comentário atualizado.");
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
    }
  };
  

  const favoriteMovie = async () => {
    try {
      await api.post("/favorites", {
        id_user: Number(userId), 
        id_film: Number(id),
      });
      setFavorited(true);
      console.log("Filme favoritado com sucesso!");
    } catch (error) {
      console.error("Erro ao favoritar filme:", error);
    }
  };
  const checkIfFavorited = async () => {
    try {
      const { data } = await api.get(`/favorites`, {
        params: {
          id_user: Number(userId),
          id_film: Number(id),
        },
      });
  
      // Suponha que o backend retorne { favorited: true } ou um array com o favorito
      if (data && (data.favorited || data.length > 0)) {
        setFavorited(true);
      }
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
      fetchEvaluations();
      checkIfFavorited();
    }
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!film) return <div>Filme não encontrado.</div>;

  return (
    <div className="movie-container">
      <Header />
      
      <div className="movie-content">
        <img
          className="movie-image"
          src={film.images || "https://via.placeholder.com/300"}
          alt={film.name}
        />
        <div className="movie-info">
          <h1>{film.name}</h1>
          <p>{film.description}</p>
          <button className="favorite-btn" onClick={favoriteMovie} disabled={favorited}>
            {favorited ? "Favoritado" : "Favoritar"}
          </button>
        </div>
      </div>
  
      <div className="movie-evaluations">
        <h2 style={{ color: "red" }}>Comentários:</h2>
        {evaluations.length === 0 ? (
          <p>Sem comentários ainda.</p>
        ) : (
          evaluations.map((evaluation) => {
            const isOwner = evaluation.id_user === Number(userId);
            return (
              <div key={evaluation.id_evaluation} className="evaluation-item">
                <p><strong>Comentário:</strong> {evaluation.comment}</p>
                <p><em>{new Date(evaluation.date_review).toLocaleDateString()}</em></p>
  
                {isOwner && (
                  <div className="evaluation-actions">
                    <button onClick={() => handleEdit(evaluation)}>Editar</button>
                    <button onClick={() => handleDelete(evaluation.id_evaluation)}>Excluir</button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
  
};

export default Movies;
