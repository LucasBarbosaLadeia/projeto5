import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Film } from "../../types/Film";
import HeaderUser from "../../components/Header";
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
      <HeaderUser />
      <h1>Catálogo de Filmes</h1>
      {loading ? (
        <StatusMessage message="Carregando..." />
      ) : films.length === 0 ? (
        <StatusMessage message="Nenhum filme encontrado." />
      ) : (
        <div className="flex justify-center">
          <div className="columnfilms grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {films.map((film) => (
              <FilmCard key={film.id_film} film={film} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
