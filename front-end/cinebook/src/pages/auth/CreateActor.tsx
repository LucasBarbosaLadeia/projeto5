import { useState, useCallback, useEffect } from "react";
import "./createActor.css";
import api from "../../utils/api";
import Header from "../../components/Header";
import { Actor } from "../../types/Actor";
import ActorCard from "../../components/ActorCard";
import GenericForm from "../../components/GenericForm";

const CreateActor = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingActorId, setEditingActorId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Actor | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    age: "",
    nationality: "",
  });

  const fetchActors = async () => {
    setLoading(true);
    try {
      const response = await api.get("/actors");
      setActors(response.data);
    } catch (error) {
      console.error("Erro ao buscar atores:", error);
    } finally {
      setLoading(false);
    }
  };

  const onCreateActor = useCallback(async () => {
    const { name, age, nationality } = formState;
    if (!name || !age || !nationality) return;

    try {
      setLoading(true);
      await api.post("/actors", {
        name,
        age: Number(age),
        nationality,
      });
      alert("Ator criado com sucesso!");
      fetchActors();
      setFormState({ name: "", age: "", nationality: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Erro ao criar ator:", error);
    } finally {
      setLoading(false);
    }
  }, [formState]);

  const handleEditActor = (actor: Actor) => {
    setEditingActorId(actor.id_actor);
    setFormData(actor);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateActor = async () => {
    if (!formData || editingActorId === null) return;

    try {
      setLoading(true);
      await api.put(`/actors/${editingActorId}`, {
        ...formData,
        age: Number(formData.age),
      });
      alert("Ator atualizado com sucesso!");
      setEditingActorId(null);
      setFormData(null);
      fetchActors();
    } catch (error) {
      console.error("Erro ao atualizar ator:", error);
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActor = async (id: number) => {
    try {
      await api.delete(`/actors/${id}`);
      alert("Ator deletado com sucesso");
      fetchActors();
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar ator");
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 text-white font-sans">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Cadastro de Atores</h2>

      <div className="flex justify-center mb-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
          onClick={() => setShowCreateForm(true)}
        >
          Novo Ator
        </button>
      </div>

      {showCreateForm && (
        <GenericForm
          title="Cadastrar Novo Ator"
          loading={loading}
          onSubmit={onCreateActor}
          onCancel={() => setShowCreateForm(false)}
          fields={[
            {
              name: "name",
              label: "Nome",
              type: "text",
              value: formState.name,
            },
            {
              name: "age",
              label: "Idade",
              type: "text",
              value: formState.age,
            },
            {
              name: "nationality",
              label: "Nacionality",
              type: "text",
              value: formState.nationality,
            },
          ]}
          onChange={(name, value) => setFormState((prev) => ({ ...prev, [name]: value }))}
        />
      )}

      <div className="w-full max-w-3xl mx-auto mt-6 space-y-4">
        {actors.map((actor) => (
          <div
            key={actor.id_actor}
            className="bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            {editingActorId === actor.id_actor ? (
              <div className="flex flex-wrap gap-4 items-center w-full">
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white p-2 rounded-xl"
                  placeholder="Nome"
                />
                <input
                  type="text"
                  name="age"
                  value={formData?.age.toString() || ""}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white p-2 rounded-xl"
                  placeholder="Idade"
                />
                <input
                  type="text"
                  name="nationalidade"
                  value={formData?.nationality || ""}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white p-2 rounded-xl"
                  placeholder="Nacionality"
                />
                <button
                  onClick={handleUpdateActor}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  onClick={() => setEditingActorId(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <ActorCard
                actor={actor}
                onEdit={handleEditActor}
                onDelete={handleDeleteActor}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateActor;
