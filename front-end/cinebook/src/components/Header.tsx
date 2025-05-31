import { Link } from "react-router-dom";
import "./Header.css";

const HeaderUser = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/home">🎬 Cinebook</Link>
        </div>
        <div className="nav-buttons">
          <Link to="/userProfile" className="nav-link">
            Perfil
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
