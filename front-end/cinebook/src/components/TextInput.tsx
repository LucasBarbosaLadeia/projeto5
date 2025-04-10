type TextInputProps = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    placeholder?: string;
  };
  
  const TextInput = ({ label, value, onChange, name, placeholder }: TextInputProps) => (
    <div className="text-input">
      {label && <label>{label}</label>}
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
  
  export default TextInput;