import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { cpf } from "cpf-cnpj-validator";
import api from "../../utils/api";
import TextInput from "../../components/TextInput";
import "./Login.css";

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateField = (field: string, value: string) => {
    let isValid = false;

    switch (field) {
      case "name":
        isValid = value.trim().length > 0;
        break;
      case "email":
        isValid = /\S+@\S+\.\S+/.test(value);
        break;
      case "password":
        isValid = value.length >= 6;
        break;
      case "confirmPassword":
        isValid = value === password;
        break;
      case "document":
        isValid = cpf.isValid(value);
        break;
      default:
        break;
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
    <div className="login-container signup-container">
      <h1 className="logo">CineBook</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateUser();
        }}
      >
        <div className="input-container">
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
            <span className={validations.name ? "valid-icon" : "invalid-icon"}>
              {validations.name ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="input-container">
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
            <span className={validations.email ? "valid-icon" : "invalid-icon"}>
              {validations.email ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="input-container">
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
            <span className={validations.document ? "valid-icon" : "invalid-icon"}>
              {validations.document ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="input-container">
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
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "🙈"}
          </span>
          {validations.password !== null && (
            <span className={validations.password ? "valid-icon" : "invalid-icon"}>
              {validations.password ? "✔" : "✖"}
            </span>
          )}
        </div>

        <div className="input-container">
          <TextInput
            label=""
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirme a senha"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField("confirmPassword", e.target.value);
            }}
          />
          <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? "👁️" : "🙈"}
          </span>
          {validations.confirmPassword !== null && (
            <span
              className={
                validations.confirmPassword ? "valid-icon" : "invalid-icon"
              }
            >
              {validations.confirmPassword ? "✔" : "✖"}
            </span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>
      <span>
        Já possui uma conta? <br />
        <a href="/">Faça login!</a>
      </span>
    </div>
  );
};

export default SignUp;
