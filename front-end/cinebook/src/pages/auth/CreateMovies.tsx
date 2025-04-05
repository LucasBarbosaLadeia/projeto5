import { useState, useCallback, useEffect } from "react";
import "./CreateMovies.css";
import api from "../../utils/api";
import { Film } from "../../types/Film";
import Header from "../../components/Header";

const CreateMovies = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [launch_date, setLaunch_date] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingFilmId, setEditingFilmId] = useState<number | null>(null); // ID do filme sendo editado
  const [formData, setFormData] = useState<Film | null>(null); // Dados do filme sendo editado

  // Busca os filmes
  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await api.get("/films");
      setFilms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Criação de um novo filme
  const onCreateMovie = useCallback(async () => {
    if (!name || !description || !images || !launch_date) {
      return;
    }
    try {
      setLoading(true);
      await api.post("/films", { name, description, images, launch_date });
      alert("Filme criado com sucesso!");
      fetchFilms(); // Atualiza a lista após a criação
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    } finally {
      setLoading(false);
    }
  }, [name, description, images, launch_date]);

  // Inicia a edição de um filme
  const handleEditFilm = (film: Film) => {
    setEditingFilmId(film.id_film);
    setFormData(film); // Define os dados do filme para edição
  };

  // Atualiza os valores do formulário ao editar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log("Atualizando campo:", e.target.name, "=>", e.target.value);
    }
  };

  // Salva as alterações no filme editado
  const handleUpdateFilm = async () => {
    if (!formData || editingFilmId === null) return;

    try {
      setLoading(true);
      await api.put(`/films/${editingFilmId}`, formData);
      alert("Filme atualizado com sucesso!");
      setEditingFilmId(null); // Sai do modo de edição
      setFormData(null);
      fetchFilms(); // Atualiza os filmes após editar
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Exclui um filme
  const handleDeleteFilm = async (id: number) => {
    try {
      await api.delete(`/films/${id}`);
      alert("Filme deletado com sucesso");
      fetchFilms(); // Atualiza os filmes após deletar
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar filme");
    }
  };

  useEffect(() => {
    fetchFilms();
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
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Imagens"
        value={images}
        onChange={(e) => setImages(e.target.value)}
      />
      <input
        placeholder="Data de Lançamento"
        value={launch_date}
        onChange={(e) => setLaunch_date(e.target.value)}
      />

      <button onClick={onCreateMovie} disabled={loading}>
        {loading ? "Criando..." : "Criar Filme"}
      </button>

      <div className="movies-container">
        {films.map((film) => (
          <div key={film.id_film} className="movie-item">
            {editingFilmId === film.id_film ? (
              // Modo de edição
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
              // Modo de visualização
              <>
                <span>
                  <strong>ID:</strong> {film.id_film}
                </span>
                <span>
                  <strong>Nome:</strong> {film.name}
                </span>
                <span>
                  <strong>Data de Lançamento:</strong> {film.launch_date}
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
