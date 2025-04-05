import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Film } from "../../types/Film";
import Header from "../../components/Header";
import "./Favorites.css";
import { Favorite } from "../../types/Favorite";
import { Link } from "react-router-dom";

const Favorites = () => {
  const userId = localStorage.getItem("userId");
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

 
  const fetchFavorites = async () => {
    setLoading(true);
    try {

      const { data } = await api.get<Favorite[]>(`/favorites?user_id=${userId}`);
  
      // Buscar os filmes por ID, em paralelo
      const filmRequests = data.map((fav) =>
        api.get<Film>(`/films/${fav.id_film}`)
      );
  
      const filmResponses = await Promise.all(filmRequests);
      const films = filmResponses.map((res) => res.data);
  
      setFavorites(films);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    } finally {
        setLoading(false)
    }
  };
  

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <Header />
      <div className="favorites-container">
        <h1>Meus Favoritos</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : favorites.length === 0 ? (
          <p>Você ainda não favoritou nenhum filme.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((film) => (
              <div key={film.id_film} className="favorite-card">
                <img src={film.images} alt={film.name} />
                <h2>{film.name}</h2>
                <p>{film.description}</p>
                <Link to={`/movies/${film.id_film}`}>Ver detalhes</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
