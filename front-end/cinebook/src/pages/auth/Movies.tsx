import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa para pegar o ID da URL
import api from "../../utils/api";
import "./Movies.css"
import { Evaluation } from "../../types/Evaluation";
interface Film {
  id_film: number;
  name: string;
  description: string;
  images: string;
}

const Movies = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState<Film | null>(null); 
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

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
      const { data } = await api.get(`/evaluations?film_id=${id}`);
      setEvaluations(data); // agora sim
      console.log("Avaliações recebidas:", data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
      fetchEvaluations(); // <-- Aqui
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!film) {
    return <div>Filme não encontrado.</div>;
  }

  return (
    <div className="movie-container">
    <img
      className="movie-image"
      src={film.images || "https://via.placeholder.com/300"}
      alt={film.name}
    />
    <div className="movie-info">
      <h1>{film.name}</h1>
      <p>{film.description}</p>
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
  );
};

export default Movies;
