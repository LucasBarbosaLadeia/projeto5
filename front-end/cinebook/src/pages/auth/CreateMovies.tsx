import { useState, useEffect } from "react";
import "./CreateMovies.css";
import api from "../../utils/api";
import { Film, Actor } from "../../types/Film";
import Header from "../../components/Header";
import GenericForm from "../../components/GenericForm";
import CreateMovieCard from "../../components/CreateMovieCard";
import TextInput from "../../components/TextInput"; 

const CreateMovies = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingFilmId, setEditingFilmId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Film | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    images: "",
    launch_date: "",
    actors: [] as number[],
  });

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await api.get("/films");
      setFilms(response.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActors = async () => {
    try {
      const response = await api.get("/actors");
      setActors(response.data);
    } catch (error) {
      console.error("Erro ao buscar atores:", error);
    }
  };

  const onCreateMovie = async () => {
    const { name, description, images, launch_date, actors } = formState;
    if (!name || !description || !images || !launch_date) return;

    try {
      setLoading(true);
      await api.post("/films", {
        name,
        description,
        images,
        launch_date,
        actorIds: actors,
      });
      alert("Filme criado com sucesso!");
      fetchFilms();
      setFormState({
        name: "",
        description: "",
        images: "",
        launch_date: "",
        actors: [],
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFilm = (film: Film) => {
    setEditingFilmId(film.id_film);
    setFormData(film);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateFilm = async () => {
    if (!formData || editingFilmId === null) return;
  
    try {
      setLoading(true);
      console.log("Dados enviados no PUT:", {
        name: formData.name,
        description: formData.description,
        launch_date: formData.launch_date,
      });
      await api.put(`/films/${editingFilmId}`, {
        
        name: formData.name,
        description: formData.description,
        launch_date: formData.launch_date,
      });
      alert("Filme atualizado com sucesso!");
      setEditingFilmId(null);
      setFormData(null);
      fetchFilms();
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFilm = async (id: number) => {
    try {
      await api.delete(`/films/${id}`);
      alert("Filme deletado com sucesso");
      fetchFilms();
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar filme");
    }
  };

  useEffect(() => {
    fetchFilms();
    fetchActors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 text-white font-sans">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Cadastro de Filmes</h2>

      <div className="flex justify-center mb-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
          onClick={() => setShowCreateForm(true)}
        >
          Novo filme
        </button>
      </div>

      {showCreateForm && (
        <GenericForm
          title="Cadastrar Novo Filme"
          loading={loading}
          onSubmit={onCreateMovie}
          onCancel={() => setShowCreateForm(false)}
          fields={[
            {
              name: "name",
              label: "Nome",
              type: "text",
              value: formState.name,
            },
            {
              name: "description",
              label: "Descrição",
              type: "text",
              value: formState.description,
            },
            {
              name: "images",
              label: "Imagens",
              type: "text",
              value: formState.images,
            },
            {
              name: "launch_date",
              label: "Data de Lançamento",
              type: "text",
              value: formState.launch_date,
            },
            {
              name: "actors",
              label: "IDs dos Atores (separados por vírgula)",
              type: "text",
              value: formState.actors.join(","),
            },
          ]}
          onChange={(name, value) => {
            if (name === "actors") {
              const ids = (value as string)
                .split(",")
                .map((id) => parseInt(id.trim()))
                .filter((id) => !isNaN(id));
              setFormState((prev) => ({ ...prev, actors: ids }));
            } else {
              setFormState((prev) => ({ ...prev, [name]: value }));
            }
          }}
        />
      )}

      <div className="w-full max-w-3xl mx-auto mt-6 space-y-4">
        {films.map((film) => (
          <div
            key={film.id_film}
            className="bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            {editingFilmId === film.id_film ? (
              <div className="flex flex-wrap gap-4 items-center w-full">
                <TextInput
                  name="name"
                  label="Nome"
                  value={formData?.name || ""}
                  onChange={handleChange}
                />
                <TextInput
                  name="description"
                  label="Descrição"
                  value={formData?.description || ""}
                  onChange={handleChange}
                />
                <TextInput
                  name="launch_date"
                  label="Data de Lançamento"
                  value={formData?.launch_date || ""}
                  onChange={handleChange}
                />
                <button
                  onClick={handleUpdateFilm}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  onClick={() => setEditingFilmId(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <CreateMovieCard
                film={film}
                onEdit={handleEditFilm}
                onDelete={handleDeleteFilm}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateMovies;
