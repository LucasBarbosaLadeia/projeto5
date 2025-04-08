import { User } from "../types/User"; // Se tiver

interface EditUserForm {
  formData: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

const EditUserForm = ({ formData, onChange, onSave, onCancel, loading }: EditUserForm) => (
  <div>
    <label>Nome:</label>
    <input name="name" value={formData.name} onChange={onChange} />

    <label>Endereço:</label>
    <input name="endereco" value={formData.endereco} onChange={onChange} />

    <label>CPF:</label>
    <input name="cpf" value={formData.cpf} onChange={onChange} />

    <label>Nova Senha:</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={onChange}
      placeholder="Deixe em branco para não alterar"
    />
    

    <button onClick={onSave} disabled={loading}>
      {loading ? "Salvando..." : "Salvar Alterações"}
    </button>
    <button onClick={onCancel}>Cancelar</button>
  </div>
);

export default EditUserForm;
