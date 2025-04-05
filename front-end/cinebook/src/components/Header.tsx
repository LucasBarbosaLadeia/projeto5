import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/home">🎬 Cinebook</Link>
        </div>
        <div className="nav-buttons">
          <Link to="/createMovies" className="nav-link">MovieAdm</Link>
          <Link to="/createActor" className="nav-link">ActorAdm</Link>
          <Link to="/userProfile" className="nav-link">Perfil</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
