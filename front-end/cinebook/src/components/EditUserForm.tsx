import React, { useState } from "react";
import { User } from "../types/User";

interface Props {
  formData: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

const EditUserForm: React.FC<Props> = ({
  formData,
  onChange,
  onSave,
  onCancel,
  loading,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let check1 = (sum * 10) % 11;
    if (check1 === 10 || check1 === 11) check1 = 0;
    if (check1 !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    let check2 = (sum * 10) % 11;
    if (check2 === 10 || check2 === 11) check2 = 0;
    return check2 === parseInt(cpf[10]);
  };

  const isStrongPassword = (password: string): boolean =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[\W_]/.test(password);

  const validateAndSave = () => {
    if (!isValidCPF(formData.cpf)) {
      alert("CPF inválido.");
      return;
    }

    if (formData.password) {
      if (!isStrongPassword(formData.password)) {
        alert(
          "A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos."
        );
        return;
      }

      if (formData.password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }
    }

    onSave();
  };

  return (
    <form className="edit-user-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
      </label>

      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={onChange}
        />
      </label>

      <label>
        Endereço:
        <input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={onChange}
        />
      </label>

      <label>
        E-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
        />
      </label>

      <label>
        Nova Senha:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Deixe em branco se não quiser mudar"
        />
      </label>

      <label>
        Confirmar Senha:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>

      <div className="button-group">
        <button type="button" onClick={validateAndSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default EditUserForm;

