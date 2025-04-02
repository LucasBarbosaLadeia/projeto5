import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import api from "../../utils/api";
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
        const response = await api.get("/films"); 
        setFilms(response.data);
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
              <div className="cardimg">
              <img src={film?.images} alt={film?.name} /> 
              </div>
              <h3>{film.name}</h3>
           
              <Link to={`/movies/${film.id_film}`}>Ver detalhes</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

