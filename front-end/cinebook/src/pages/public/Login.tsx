import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id_user: number;
  name: string;
  email: string;
  admin: boolean;
}

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
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Entrar</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <input
          className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-xl hover:bg-red-700 transition"
        >
          Entrar
        </button>
      </form>

      <span className="mt-4 text-sm text-white text-center">
        Informe o e-mail e senha cadastrados. <br />
        Novo por aqui?{" "}
        <Link to="/signup" className="text-red-400 underline">
          Cadastre-se!
        </Link>
      </span>
    </div>
  );
};

export default Login;
