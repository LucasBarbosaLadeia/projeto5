import { useState, useCallback, useEffect } from "react";
import "./createActor.css";
import api from "../../utils/api";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { Actor } from "../../types/Actor";

const CreateActor = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingActorId, setEditingActorId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Actor | null>(null);

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
    if (!name || !age || !nationality) return;

    try {
      setLoading(true);
      await api.post("/actors", { name, age: Number(age), nationality });
      alert("Ator criado com sucesso!");
      fetchActors();
      setName("");
      setAge("");
      setNationality("");
    } catch (error) {
      console.error("Erro ao criar ator:", error);
    } finally {
      setLoading(false);
    }
  }, [name, age, nationality]);

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
    <div className="container">
      <Header />
      <h2>Cadastro de Atores</h2>

      <TextInput
        label="Nome"
        placeholder="Nome do ator"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
      />
      <TextInput
        label="Idade"
        placeholder="Idade do ator"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        name="age"
      />
      <TextInput
        label="Nacionalidade"
        placeholder="Nacionalidade do ator"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        name="nationality"
      />

      <button onClick={onCreateActor} disabled={loading}>
        {loading ? "Criando..." : "Criar ator"}
      </button>

      <div className="movies-container">
        {actors.map((actor) => (
          <div key={actor.id_actor} className="movie-item">
            {editingActorId === actor.id_actor ? (
              <div>
                <TextInput
                  label="Nome"
                  value={formData?.name || ""}
                  onChange={handleChange}
                  name="name"
                  placeholder="Nome"
                />
                <TextInput
                  label="Idade"
                  value={formData?.age.toString() || ""}
                  onChange={handleChange}
                  name="age"
                  placeholder="Idade"
                />
                <TextInput
                  label="Nacionalidade"
                  value={formData?.nationality || ""}
                  onChange={handleChange}
                  name="nationality"
                  placeholder="Nacionalidade"
                />
                <button onClick={handleUpdateActor} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button onClick={() => setEditingActorId(null)}>Cancelar</button>
              </div>
            ) : (
              <>
                <span>
                  <strong>ID:</strong> {actor.id_actor}
                </span>
                <span>
                  <strong>Nome:</strong> {actor.name}
                </span>
                <span>
                  <strong>Idade:</strong> {actor.age}
                </span>
                <span>
                  <strong>Nacionalidade:</strong> {actor.nationality}
                </span>
                <button
                  onClick={() => handleDeleteActor(actor.id_actor)}
                  className="delete-button"
                >
                  Deletar
                </button>
                <button onClick={() => handleEditActor(actor)}>Editar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateActor;
