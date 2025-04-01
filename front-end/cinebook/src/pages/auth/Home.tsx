import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Corrigi a importação para "react-router-dom"
import api from "../../utils/api";
import "./Home.css"
interface Film {
  id_film: number;
  name: string;
  description: string;
  images: string;
}

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const response = await api.get("/films"); // Certifique-se de que a rota está correta
        setFilms(response.data); // Supondo que a API retorna um array de filmes
        console.log(response.data)
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
      <h1>Catálogo de Filmes</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="columnfilms">
          {films.map((film) => (
            <div className="cardfilme1">
              <img src={film?.images} alt={film?.name} />
              <h3>{film.name}</h3>
              <p>{film.description}</p>
              <Link to={`/movies/${film.id_film}`}>Ver detalhes</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

