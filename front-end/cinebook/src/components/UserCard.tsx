interface UserCardProps {
    name: string;
    onEdit: () => void;
  }
  
  const UserCard = ({ name, onEdit }: UserCardProps) => (
    <div className="user-card">
      <div className="user-avatar"></div>
      <h3>{name}</h3>
      <button onClick={onEdit}>Editar</button>
    </div>
  );
  
  export default UserCard;
  