import { useEffect, useState } from "react";
import api from "../../utils/api";
import "./UserProfile.css"
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";

interface User {
  name: string;
  cpf: string;
  endereco: string;
  password: string;
}

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    cpf: "",
    endereco: "",
    password: "",
  });

  // Busca os dados do usuário
  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<User>(`/users/${userId}`);
      setUser(data);
      setFormData(data); // Preenche o formulário com os dados do usuário
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza os dados do usuário
  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      await api.put(`/users/${userId}`, formData); // Envia os dados editados
      alert("Usuário atualizado com sucesso!");
      setEditing(false);
      fetchUser(); // Atualiza os dados na tela
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Captura alterações no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado.</div>;

  const HandleDeleteUser = async () => {
    try {
      await api.delete(`/users/${userId}`)
      alert("usuario deletado com sucesso")
      
    } catch (error) {
      console.log(error)
      alert("erro ao deletar usuario")
    }
  }

  return (
    <div>
      <Header />
    <div className="user-profile">
      <h2>Perfil do Usuário</h2><button onClick={HandleDeleteUser}>deletar perfil</button>

      <div className="user-container">
        {/* Card do Usuário */}
        <div className="user-card">
          <div className="user-avatar"></div>
          <h3>{user.name}</h3>
          {!editing && <button onClick={() => setEditing(true)}>Editar</button>}
        </div>

        {/* Formulário de Edição */}
        <div className="user-info">
          {editing ? (
            <div>
              <label>Nome:</label>
              <input name="name" value={formData.name} onChange={handleChange} />

              <label>Endereço:</label>
              <input name="endereco" value={formData.endereco} onChange={handleChange} />

              <label>CPF:</label>
              <input name="cpf" value={formData.cpf} onChange={handleChange} />

              <label>Senha</label>
              <input name="senha" value={formData.password} onChange={handleChange} />

              <button onClick={handleUpdateUser} disabled={loading}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
              <button onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          ) : (
            <div>
              <p><strong>Endereço:</strong></p> <p>{user.endereco}</p>
              <p><strong>CPF:</strong></p> <p>{user.cpf}</p>
              <button onClick={() => logout()}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
