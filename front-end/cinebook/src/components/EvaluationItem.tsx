import { useState } from "react";
import { Evaluation } from "../types/Evaluation";

interface Props {
  evaluation: Evaluation;
  isOwner: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, newComment: string) => void;
}

const EvaluationItem = ({ evaluation, isOwner, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(evaluation.comment);

  const handleSave = () => {
    onEdit(evaluation.id_evaluation, comment);
    setIsEditing(false);
  };

  return (
    <div className="evaluation-item">
      {isEditing ? (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="edit-textarea"
          />
          <div className="evaluation-actions">
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>Comentário:</strong> {evaluation.comment}
          </p>
          <p>
            <em>{new Date(evaluation.date_review).toLocaleDateString()}</em>
          </p>
          {isOwner && (
            <div className="evaluation-actions">
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={() => onDelete(evaluation.id_evaluation)}>
                Excluir
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EvaluationItem;
