import React, { useState } from "react";
import { User } from "../types/User";
import TextInput from "./TextInput";

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
    <form className="edit-user-form flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <TextInput
        name="name"
        label="Nome"
        value={formData.name}
        onChange={onChange}
      />

      <TextInput
        name="cpf"
        label="CPF"
        value={formData.cpf}
        onChange={onChange}
      />

      <TextInput
        name="password"
        label="Nova Senha"
        value={formData.password || ""}
        onChange={onChange}
        type="password"
        placeholder="Deixe em branco se não quiser mudar"
      />

      <TextInput
        name="confirmPassword"
        label="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
      />

      <div className="flex gap-4 mt-4">
        <button type="button" onClick={validateAndSave} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
