import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

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
        return; // Caso o token não exista, podemos retornar ou mostrar um erro
      }
      
      console.log("Token recebido:", token);
      login(token);
      navigate("/movies");
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Senha"
      />
      <button type="submit">Entrar</button>
    </form>
    <h1 >Entrar</h1>
          <span>
            Informe o e-mail e senha cadastrados. Novo por aqui?
            <Link
              to="/signup"
            >
              {" "}
              Cadastre-se!
            </Link>
            </span>
    </div>
  );
};

export default Login;