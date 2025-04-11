// components/CommentBox.tsx
interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const CommentBox = ({ value, onChange, onSubmit }: Props) => (
  <div className="add-comment">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escreva seu comentário aqui..."
      rows={3}
      className="edit-textarea"
    />
    <button onClick={onSubmit}>Adicionar Comentário</button>
  </div>
);

export default CommentBox;
