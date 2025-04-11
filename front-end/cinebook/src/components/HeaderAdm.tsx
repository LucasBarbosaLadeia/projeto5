import { Link } from "react-router-dom";

const HeaderAdm = () => {
  return (
    <header className="bg-black text-red-500">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="logo text-xl font-bold">
          <Link to="/home" className="hover:text-red-300">
            🎬 Cinebook
          </Link>
        </div>
        <div className="nav-buttons flex space-x-4">
          <Link to="/createMovies" className="nav-link hover:text-red-300">
            MovieAdm
          </Link>
          <Link to="/createActor" className="nav-link hover:text-red-300">
            ActorAdm
          </Link>
          <Link to="/userProfile" className="nav-link hover:text-red-300">
            Perfil
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdm;
