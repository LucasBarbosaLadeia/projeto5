import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Film } from "../../types/Film";
import HeaderAdm from "../../components/HeaderAdm";
import FilmCard from "../../components/FilmCard";
import StatusMessage from "../../components/StatusMessage";
import "./HomeAdmin.css";

const HomeAdmin = () => {
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
      <HeaderAdm />
      <h1>Catálogo de Filmes ADM</h1>
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

export default HomeAdmin;
