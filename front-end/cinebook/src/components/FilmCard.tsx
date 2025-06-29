import { Film } from "../types/Film";
import { Link } from "react-router-dom";
import "./FilmCard.css";

const FilmCard = ({ film }: { film: Film }) => {
  return (
    <div className="backdrop-blur-sm bg-zinc-800/50 border border-red-600 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:border-red-400 p-4 flex flex-col justify-between text-white">
      <div className="aspect-w-3 aspect-h-2 w-full mb-4">
        <img
          src={film.images}
          alt={film.name}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
      <h2 className="text-lg font-semibold text-center mb-2">{film.name}</h2>
      <Link
        to={`/movies/${film.id_film}`}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl text-center transition"
      >
        Ver detalhes
      </Link>
    </div>
  );
};

export default FilmCard;
