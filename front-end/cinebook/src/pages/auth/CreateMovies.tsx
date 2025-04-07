import { useState, useCallback, useEffect } from "react";
import "./CreateMovies.css";
import api from "../../utils/api";
import { Film, Actor } from "../../types/Film";
import Header from "../../components/Header";

const CreateMovies = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [launch_date, setLaunch_date] = useState("");
  const [selectedActorIds, setSelectedActorIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [editingFilmId, setEditingFilmId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Film | null>(null);

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

  const onCreateMovie = useCallback(async () => {
    if (!name || !description || !images || !launch_date) return;

    try {
      setLoading(true);
      await api.post("/films", {
        name,
        description,
        images,
        launch_date,
        actorIds: selectedActorIds,
      });
      alert("Filme criado com sucesso!");
      fetchFilms();
      setName("");
      setDescription("");
      setImages("");
      setLaunch_date("");
      setSelectedActorIds([]);
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    } finally {
      setLoading(false);
    }
  }, [name, description, images, launch_date, selectedActorIds]);

  const handleEditFilm = (film: Film) => {
    setEditingFilmId(film.id_film);
    setFormData(film);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateFilm = async () => {
    if (!formData || editingFilmId === null) return;

    try {
      setLoading(true);
      await api.put(`/films/${editingFilmId}`, formData);
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
    <div className="container">
      <Header />
      <h2>Cadastro de Filmes</h2>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Imagem"
        value={images}
        onChange={(e) => setImages(e.target.value)}
      />
      <input
        placeholder="Data de Lançamento"
        value={launch_date}
        onChange={(e) => setLaunch_date(e.target.value)}
      />

      <label>Selecione os Atores:</label>
      <select
        multiple
        value={selectedActorIds.map(String)}
        onChange={(e) =>
          setSelectedActorIds(
            Array.from(e.target.selectedOptions, (opt) => Number(opt.value))
          )
        }
      >
        {actors.map((actor) => (
          <option key={actor.id_actor} value={actor.id_actor}>
            {actor.name}
          </option>
        ))}
      </select>

      <button onClick={onCreateMovie} disabled={loading}>
        {loading ? "Criando..." : "Criar Filme"}
      </button>

      <div className="movies-container">
        {films.map((film) => (
          <div key={film.id_film} className="movie-item">
            {editingFilmId === film.id_film ? (
              <div>
                <label>Nome:</label>
                <input
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleChange}
                />

                <label>Descrição:</label>
                <input
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleChange}
                />

                <label>Imagem:</label>
                <input
                  name="images"
                  value={formData?.images || ""}
                  onChange={handleChange}
                />

                <label>Data de Lançamento:</label>
                <input
                  name="launch_date"
                  value={formData?.launch_date || ""}
                  onChange={handleChange}
                />

                <button onClick={handleUpdateFilm} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button onClick={() => setEditingFilmId(null)}>Cancelar</button>
              </div>
            ) : (
              <>
                <span><strong>ID:</strong> {film.id_film}</span>
                <span><strong>Nome:</strong> {film.name}</span>
                <span><strong>Descrição:</strong> {film.description}</span>
                <span><strong>Data de Lançamento:</strong> {film.launch_date}</span>
                <span><strong>Atores:</strong>{" "}
                  {film.actors?.map((actor) => actor.name).join(", ") || "Nenhum"}
                </span>
                <button
                  onClick={() => handleDeleteFilm(film.id_film)}
                  className="delete-button"
                >
                  Deletar
                </button>
                <button onClick={() => handleEditFilm(film)}>Editar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateMovies;
