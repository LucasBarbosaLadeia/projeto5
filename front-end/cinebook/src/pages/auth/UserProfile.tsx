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
  
      
      delete updatedData.email;
  
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

        <div className="user-container">
          <div className="user-card">
            <UserCard name={user.name} onEdit ={() => setEditing(true)} />
          </div>

          <div className="user-info">
          <div className="w-full flex justify-end px-4 mb-4">
  <button
    onClick={handleDeleteUser}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
  >
    Deletar Perfil
  </button>
</div>
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
                <p><strong>Email:</strong>{user.email}</p>
                <p><strong>CPF:</strong> {user.cpf}</p>
                <button onClick={logout}  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;