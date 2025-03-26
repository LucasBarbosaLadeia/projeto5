import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator"; 

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    console.log({
      name,
      email,
      password,
      endereco: "endereço", 
      cpf: document,
    });
    try {
      setLoading(true);
      await axios.post("/users", {
       name,
        email,
       password,
       endereco: "endereço",
        cpf: document,
      });

      alert("Usuário criado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setLoading(false);
    }
  }, [name, email, password, confirmPassword, document, navigate]);

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="CPF" value={document} onChange={(e) => setDocument(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input
        type="password"
        placeholder="Confirme a senha"
        value={confirmPassword}
        
        onChange={(e) => setConfirmPassword(e.target.value)}
        
      />
      <button onClick={onCreateUser} disabled={loading}>
        {loading ? "Criando..." : "Criar Conta"}
      </button>
    </div>
  );
};

export default SignUp;

