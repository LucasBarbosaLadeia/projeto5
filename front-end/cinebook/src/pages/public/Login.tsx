import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

interface DecodedToken {
  id_user: number;
  name: string;
  email: string;
  admin: boolean;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;
      if (!token) {
        console.log("Token não encontrado!");
        return;
      }

      const decodedToken: DecodedToken = jwtDecode(token);
      const { id_user, admin } = decodedToken;

      localStorage.setItem("userId", String(id_user));
      login(token);

      // Redireciona baseado no tipo de usuário
      if (admin) {
        navigate("/auth/HomeAdmin"); // admin
      } else {
        navigate("/auth/Home"); // usuário comum
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="logo">CineBook</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <div className="input-container">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
          />
          <span
            className="toggle-password-login"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "🙈"} {/* Ícone de olho */}
          </span>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <span>
        Informe o e-mail e senha cadastrados.
        <br /> Novo por aqui?
        <Link to="/signup"> Cadastre-se!</Link>
      </span>
    </div>
  );
};

export default Login;
