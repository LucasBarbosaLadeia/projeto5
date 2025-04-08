import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Film } from "../../types/Film";
import Header from "../../components/Header";
import FilmCard from "../../components/FilmCard";
import StatusMessage from "../../components/StatusMessage";
import "./Home.css";

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const response = await api.get("/films");
        setFilms(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <Header />
      <h1>Catálogo de Filmes</h1>
      {loading ? (
        <StatusMessage message="Carregando..." />
      ) : films.length === 0 ? (
        <StatusMessage message="Nenhum filme encontrado." />
      ) : (
        <div className="columnfilms">
          {films.map((film) => (
            <FilmCard key={film.id_film} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

