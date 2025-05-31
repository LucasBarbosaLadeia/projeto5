import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { cpf } from "cpf-cnpj-validator";
import api from "../../utils/api";
import TextInput from "../../components/TextInput";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validations, setValidations] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    document: null,
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const validateField = (field: string, value: string) => {
    let isValid = false;
    switch (field) {
      case "name": isValid = value.trim().length > 0; break;
      case "email": isValid = /\S+@\S+\.\S+/.test(value); break;
      case "password": isValid = value.length >= 6; break;
      case "confirmPassword": isValid = value === password; break;
      case "document": isValid = cpf.isValid(value); break;
    }
    setValidations((prev) => ({ ...prev, [field]: isValid }));
  };

  const onCreateUser = useCallback(async () => {
    if (!name || !email || !password || !document) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!cpf.isValid(document)) {
      alert("CPF inválido! Insira um CPF válido.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users", {
        name,
        email,
        password,
        endereco: "endereço",
        cpf: document,
      });

      alert("Usuário criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário.");
    } finally {
      setLoading(false);
    }
  }, [name, email, password, confirmPassword, document, navigate]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center px-4 ">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Cadastre-se</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateUser();
        }}
        className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <div className="relative">
          <TextInput
            label=""
            name="name"
            value={name}
            placeholder="Nome"
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
          />
          {validations.name !== null && (
            <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl ${validations.name ? "text-green-500" : "text-red-500"}`}>
              {validations.name ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="relative">
          <TextInput
            label=""
            name="email"
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {validations.email !== null && (
            <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl ${validations.email ? "text-green-500" : "text-red-500"}`}>
              {validations.email ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="relative">
          <TextInput
            label=""
            name="document"
            value={document}
            placeholder="CPF"
            onChange={(e) => {
              setDocument(e.target.value);
              validateField("document", e.target.value);
            }}
          />
          {validations.document !== null && (
            <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl ${validations.document ? "text-green-500" : "text-red-500"}`}>
              {validations.document ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="relative">
          <TextInput
            label=""
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
          />
          <span
            className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
          {validations.password !== null && (
            <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl ${validations.password ? "text-green-500" : "text-red-500"}`}>
              {validations.password ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="relative">
          <TextInput
            label=""
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirme"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField("confirmPassword", e.target.value);
            }}
          />
          <span
            className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "👁️" : "🙈"}
          </span>
          {validations.confirmPassword !== null && (
            <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl ${validations.confirmPassword ? "text-green-500" : "text-red-500"}`}>
              {validations.confirmPassword ? "✔" : "✖"}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-xl hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>

      <span className="mt-4 text-sm text-white text-center">
        Já possui uma conta? <br />
        <a href="/" className="text-red-400 underline">Faça login!</a>
      </span>
    </div>
  );
};

export default SignUp;
