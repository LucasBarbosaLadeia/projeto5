import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

interface DecodedToken {
  id_user: number;
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
      const response = await api.post("/login", { email, password });

      const token = response.data.token;
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      const decodedToken: DecodedToken = jwtDecode(token);
      const userId = decodedToken.id_user;

      if (userId) {
        localStorage.setItem("userId", String(userId));
      }

      login(token);


            navigate("/home");

    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response?.status === 404) {
        alert("E-mail não encontrado. Verifique se digitou corretamente.");
      } else {
        alert("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Entrar</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
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
    </div>
  );
};

export default Login;
