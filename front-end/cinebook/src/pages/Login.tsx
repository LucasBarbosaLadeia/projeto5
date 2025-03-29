import React, { useState } from "react";

const CriarUsuario = () => {
  const [name, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");

  const removeCPFFormatting = (cpf: string) => {
    return cpf.replace(/[^\d]+/g, "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Limpa a pontuação do CPF antes de enviar
    const cleanCpf = removeCPFFormatting(cpf);

    const usuario = {
      name,
      password,
      email,
      endereco,
      cpf: cleanCpf, // CPF sem pontuação
    };

    try {
      console.log("Enviando dados:", usuario);

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar usuário!");
      }
    } catch (error) {
      console.error("Erro na comunicação com o servidor:", error);
      alert("Erro na comunicação com o servidor!");
    }
  };

  return (
    <div>
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CriarUsuario;
