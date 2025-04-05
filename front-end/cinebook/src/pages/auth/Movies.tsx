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

  useEffect(() => {
    if (id) {
      fetchMovie();
      fetchEvaluations();
    }
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!film) return <div>Filme não encontrado.</div>;

  return (
    <div>
      <Header />
      <div className="movie-container">
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

        <div className="movie-evaluations">
          <h2>Comentários:</h2>
          {evaluations.length === 0 ? (
            <p>Sem comentários ainda.</p>
          ) : (
            evaluations.map((evaluation) => (
              <div key={evaluation.id_evaluation} className="evaluation-item">
                <p><strong>Comentário:</strong> {evaluation.comment}</p>
                <p><em>{new Date(evaluation.date_review).toLocaleDateString()}</em></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
