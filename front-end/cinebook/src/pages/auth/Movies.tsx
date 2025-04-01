import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa para pegar o ID da URL
import api from "../../utils/api";
import "./Movies.css"
interface Film {
  id_film: number;
  name: string;
  description: string;
  images: string;
}

const Movies = () => {
  const { id } = useParams(); // Pegamos o ID da URL
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState<Film | null>(null); // Agora é um único filme

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Film>(`/films/${id}`); // Busca o filme pelo ID
      setFilm(data);
      console.log("Filme recebido:", data);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
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
  </div>
  );
};

export default Movies;
