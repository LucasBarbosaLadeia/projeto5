import React from "react";
import { Actor } from "../types/Actor";

interface ActorCardProps {
  actor: Actor;
  onEdit: (actor: Actor) => void;
  onDelete: (id: number) => void;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg w-full">
      
      <div className="flex flex-wrap gap-x-4 flex-1">
        <span><strong>ID:</strong> {actor.id_actor}</span>
        <span><strong>Nome:</strong> {actor.name}</span>
        <span><strong>Idade:</strong> {actor.age}</span>
        <span><strong>Nacionalidade:</strong> {actor.nationality}</span>
      </div>

      <div className="flex gap-x-2 flex-shrink-0">
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => onEdit(actor)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => onDelete(actor.id_actor)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default ActorCard;
