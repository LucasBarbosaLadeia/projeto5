import React from "react";

interface TextInputProps {
  name: string;
  label?: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label htmlFor={name} className="text-sm font-semibold">{label}</label>}
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className="bg-zinc-800 text-white p-2 rounded-xl w-full"
      />
    </div>
  );
};

export default TextInput;
