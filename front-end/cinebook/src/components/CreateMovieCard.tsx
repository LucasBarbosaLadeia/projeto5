import React from "react";

import { Film } from "../types/Film";

interface ActorCardProps {
  film: Film;
  onEdit: (film: Film) => void;
  onDelete: (id: number) => void;
}

const CreateMovieCard: React.FC<ActorCardProps> = ({
  film,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg w-full">
    
      <div className="flex flex-wrap gap-x-4 flex-1">
        <span>
          <strong>ID:</strong> {film.id_film}
        </span>
        <span>
          <strong>Nome:</strong> {film.name}
        </span>
        <span>
          <strong>descrição:</strong> {film.description}
        </span>
        <span>
          <strong>Data de lançamento:</strong> {film.launch_date}
        </span>
        <span>
          <strong>Atores:</strong>{" "}
          {film.actors?.map((actors) => actors.name).join(", ")}
        </span>
      </div>

      <div className="flex gap-x-2 flex-shrink-0">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={() => onEdit(film)}
        >
        editar - ${film.id_film}
        </button>
      <button
  data-testid={`delete-film-${film.name}`}
  onClick={() => onDelete(film.id_film)}
  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
>
  Deletar
</button>
      </div>
    </div>
  );
};

export default CreateMovieCard;
