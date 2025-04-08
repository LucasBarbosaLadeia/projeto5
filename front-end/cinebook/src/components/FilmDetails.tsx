// components/MovieDetails.tsx
import { Film } from "../types/Film";


interface Props {
  movie: Film;
  favorited: boolean;
  onFavorite: () => void;
}

const FilmDetails = ({ movie, favorited, onFavorite }: Props) => (
  <div className="movie-content">
    <img
      className="movie-image"
      src={movie.images || "https://via.placeholder.com/300"}
      alt={movie.name}
    />
    <div className="movie-info">
      <h1>{movie.name}</h1>
      <p>{movie.description}</p>
      <button
        className="favorite-btn"
        onClick={onFavorite}
        disabled={favorited}
      >
        {favorited ? "Favoritado" : "Favoritar"}
      </button>
    </div>
  </div>
);

export default FilmDetails;
