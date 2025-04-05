import { useState, useCallback, useEffect } from "react";
import "./createActor.css";
import api from "../../utils/api";

import Header from "../../components/Header";
import { Actor } from "../../types/Actor";

const CreateActor = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nacionality, setNacionality] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [editingActorId, setEditingActorId] = useState<number | null>(null); // ID do filme sendo editado
  const [formData, setFormData] = useState<Actor | null>(null); // Dados do filme sendo editado

  // Busca os filmes
  const fetchActors = async () => {
    setLoading(true);
    try {
      const response = await api.get("/actors");
      setActors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar atores:", error);
    } finally {
      setLoading(false);
    }
  };

  // Criação de um novo filme
  const onCreateActor = useCallback(async () => {
    if (!name || !age || !nacionality ) {
      return;
    }
    try {
      setLoading(true);
      await api.post("/actors", { name, age: Number(age), nacionality });
      alert("Filme criado com sucesso!");
      fetchActors(); // Atualiza a lista após a criação
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    } finally {
      setLoading(false);
    }
  }, [name, age, nacionality]);

  // Inicia a edição de um filme
  const handleEditActor = (actor: Actor) => {
    setEditingActorId(actor.id_actor);
    setFormData(actor); // Define os dados do filme para edição
  };

  // Atualiza os valores do formulário ao editar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log("Atualizando campo:", e.target.name, "=>", e.target.value);
    }
  };

  // Salva as alterações no filme editado
  const handleUpdateActor = async () => {
    if (!formData || editingActorId === null) return;

    try {
      setLoading(true);
      await api.put(`/actors/${editingActorId}`, formData);
      alert("Filme atualizado com sucesso!");
      setEditingActorId(null); // Sai do modo de edição
      setFormData(null);
      fetchActors(); // Atualiza os filmes após editar
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Exclui um filme
  const handleDeleteActor = async (id: number) => {
    try {
      await api.delete(`/actors/${id}`);
      alert("Filme deletado com sucesso");
      fetchActors(); // Atualiza os filmes após deletar
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar filme");
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  return (
    
    <div className="container">
      <Header />
      <h2>Cadastro</h2>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="idade"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        placeholder="nacionalidade"
        value={nacionality}
        onChange={(e) => setNacionality(e.target.value)}
      />
      

      <button onClick={onCreateActor} disabled={loading}>
        {loading ? "Criando..." : "Criar Filme"}
      </button>

      <div className="movies-container">
        {actors.map((actor) => (
          <div key={actor.id_actor} className="movie-item">
            {editingActorId === actor.id_actor ? (
              // Modo de edição
              <div>
                <label>Nome:</label>
                <input
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleChange}
                />

                <label>idade:</label>
                <input
                  name="age"
                  value={formData?.age || ""}
                  onChange={handleChange}
                />

                <label>nacionalidade:</label>
                <input
                  name="nacionality"
                  value={formData?.nacionality || ""}
                  onChange={handleChange}
                />

                <button onClick={handleUpdateActor} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button onClick={() => setEditingActorId(null)}>Cancelar</button>
              </div>
            ) : (
              // Modo de visualização
              <>
                <span>
                  <strong>ID:</strong> {actor.id_actor}
                </span>
                <span>
                  <strong>Nome:</strong> {actor.name}
                </span>
                <span>
                  <strong>idade:</strong> {actor.age}
                </span>
                <span>
                  <strong>nacionalidade:</strong> {actor.nacionality}
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
