import { Film } from "../types/Film";
import { Link } from "react-router-dom";
import "./FilmCard.css"

const FilmCard = ({ film }: { film: Film }) => {
  return (
    <div className="film-card">
      <img src={film.images} alt={film.name} />
      <h2>{film.name}</h2>
      <Link to={`/movies/${film.id_film}`}>Ver detalhes</Link>
    </div>
  );
};

export default FilmCard;
