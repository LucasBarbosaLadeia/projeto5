import { useState, useCallback } from "react";



import api from "../../utils/api";


const CreateMovies = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [launch_date, setLaunch_date] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateMovie = useCallback(async () => {
    if (!name || !description || !images || !launch_date) {

      return;
    }
    console.log({
      name
      ,
 
    });
    try {
      setLoading(true);
      await api.post("/films", {
       name,
       description,
       images,
       launch_date
     
      });

      alert("filme criado com sucesso!");
    
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    } finally {
      setLoading(false);
    }
  }, [name, description, images, launch_date]);

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="images" value={images} onChange={(e) => setImages(e.target.value)} />
      <input placeholder="launch_date" value={launch_date} onChange={(e) => setLaunch_date(e.target.value)} />
      
      <button onClick={onCreateMovie} disabled={loading}>
        {loading ? "Criando..." : "Criar filme"}
      </button>
    </div>
  );
};

export default CreateMovies;

