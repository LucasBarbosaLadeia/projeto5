interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  type?: string; // <-- Adiciona isso aqui
}

const TextInput = ({
  label,
  value,
  onChange,
  name,
  placeholder,
  type = "text", // <-- valor padrão
}: TextInputProps) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default TextInput;
