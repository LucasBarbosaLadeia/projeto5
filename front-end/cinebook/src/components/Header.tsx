import { Link } from "react-router-dom";
import "./Header.css";

const HeaderUser = () => {
  return (
    <header className="bg-black/60 backdrop-blur-md shadow-lg border-b border-red-600">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-3xl font-extrabold text-red-500 tracking-wider">
          <Link
            to="/home"
            className="hover:text-red-300 transition duration-200"
          >
            🎬 Cinebook
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/createMovies" className="nav-link">
            createMovies
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/createActor" className="nav-link">
            createActors
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
