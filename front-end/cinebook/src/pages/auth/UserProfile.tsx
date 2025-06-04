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
    // eslint-disable-next-line
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
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar sua conta?"
    );
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

  if (loading)
    return (
      <div className="text-center mt-10 text-lg text-red-600">
        Carregando...
      </div>
    );
  if (!user)
    return (
      <div className="text-center mt-10 text-lg text-red-600">
        Usuário não encontrado.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <div className="bg-zinc-900 rounded-2xl shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
            Perfil do Usuário
          </h2>
          <div className="flex flex-col items-center mb-6">
            <UserCard name={user.name} onEdit={() => setEditing(true)} />
          </div>
          <div>
            {editing ? (
              <EditUserForm
                formData={formData}
                onChange={handleInputChange}
                onSave={handleUpdateUser}
                onCancel={() => setEditing(false)}
                loading={loading}
              />
            ) : (
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-8 sm:items-center sm:justify-between">
                {/* Dados do usuário */}
                <div className="flex flex-col gap-2 sm:gap-4 min-w-[220px]">
                  <div>
                    <span className="font-semibold text-red-400">Nome:</span>{" "}
                    {user.name}
                  </div>
                  <div>
                    <span className="font-semibold text-red-400">Email:</span>{" "}
                    {user.email}
                  </div>
                  <div>
                    <span className="font-semibold text-red-400">CPF:</span>{" "}
                    {user.cpf}
                  </div>
                </div>
                {/* Botões */}
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition w-full sm:w-auto"
                  >
                    Editar Perfil
                  </button>
                  <button
                    onClick={logout}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition w-full sm:w-auto"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition w-full sm:w-auto"
                  >
                    Deletar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
