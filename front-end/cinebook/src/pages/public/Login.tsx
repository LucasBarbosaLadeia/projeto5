import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

interface DecodedToken {
  user: {
    id_user: number;
    name: string;
    email: string;
  };
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
        password: password,
      });

      console.log("Resposta da API:", response.data);
      const token = response.data.token;
      if (!token) {
        console.log("Token não encontrado!");
        return;
      }

      const decodedToken: DecodedToken = jwtDecode(token);
      const userId = decodedToken.user?.id_user || null;

      console.log("ID do usuário extraído do token:", userId);

      if (userId !== null) {
        localStorage.setItem("userId", String(userId));
      }
      login(token);

      navigate("/home");
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
