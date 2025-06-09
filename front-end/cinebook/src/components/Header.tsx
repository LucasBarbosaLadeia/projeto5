import { Link } from "react-router-dom";
import "./Header.css";

const HeaderUser = () => {
  return (
    <header className="bg-black/60 backdrop-blur-md shadow-lg border-b border-red-600">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-red-500 tracking-wider">
          <Link
            to="/home"
            className="hover:text-red-300 transition duration-200"
          >
            🎬 Cinebook
          </Link>
        </div>

        {/* Botões lado a lado */}
        <div className="flex gap-4">
          <Link
            to="/createMovies"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Create Movies
          </Link>
          <Link
            to="/createActor"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Create Actors
          </Link>
          <Link
            to="/userProfile"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Usuario
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
