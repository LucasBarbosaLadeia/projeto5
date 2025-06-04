import { Film } from "../types/Film";
import "./FilmDetails.css";

interface Props {
  movie: Film;
  favorited: boolean;
  onFavorite: () => void;
}

const FilmDetails = ({ movie, favorited, onFavorite }: Props) => (
  <div className="movie-content flex items-center gap-8 bg-zinc-900 text-white p-8 rounded-2xl shadow-xl max-w-6xl mx-auto mt-10 min-h-[340px]">
    <img
      className="img"
      src={movie.images || "https://via.placeholder.com/300"}
      alt={movie.name}
    />
    <div className="NomeDescription">
      <div className="movie-info flex flex-col justify-start h-full max-w-2xl">
        <h1 className="text-3xl font-bold text-red-500 mb-3 leading-tight self-center">
          {movie.name}
        </h1>
        <p className="text-lg text-zinc-300 mb-6 leading-relaxed line-clamp-4 self-center">
          {movie.description}
        </p>
        <button
          className={`botao
        ${favorited ? "cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
          onClick={onFavorite}
          disabled={favorited}
        >
          {favorited ? "Favoritado" : "Favoritar"}
        </button>
      </div>
    </div>
  </div>
);

export default FilmDetails;
