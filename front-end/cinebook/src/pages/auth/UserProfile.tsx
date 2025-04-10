import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import UserCard from "../../components/UserCard";
import EditUserForm from "../../components/EditUserForm";
import "./UserProfile.css";
import { User } from "../../types/User";



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
    email: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<User>(`/users/${userId}`);
      setUser(data);
      setFormData({
        name: data.name,
        cpf: data.cpf,
        endereco: data.endereco,
        password: "",
        email: data.email,
      });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);

      const updatedData: Partial<User> = { ...formData };
      if (!formData.password) {
        delete updatedData.password;
      }

      await api.put(`/users/${userId}`, updatedData);
      alert("Usuário atualizado com sucesso!");
      setEditing(false);
      fetchUserData();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${userId}`);
      alert("Usuário deletado com sucesso!");
      logout();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário.");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado.</div>;

  return (
    <div>
      <Header />
      <div className="user-profile">
        <h2>Perfil do Usuário</h2>
        <button onClick={handleDeleteUser} className="delete-button">
          Deletar Perfil
        </button>

        <div className="user-container">
          <div className="user-card">
            <UserCard name={user.name} onEdit={() => setEditing(true)} />
          </div>

          <div className="user-info">
            {editing ? (
              <EditUserForm
                formData={formData}
                onChange={handleInputChange}
                onSave={handleUpdateUser}
                onCancel={() => setEditing(false)}
                loading={loading}
              />
            ) : (
              <div>
                <p><strong>Endereço:</strong> {user.endereco}</p>
                <p><strong>CPF:</strong> {user.cpf}</p>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
