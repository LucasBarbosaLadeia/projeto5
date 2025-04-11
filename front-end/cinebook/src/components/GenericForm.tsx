import React from "react";

type FieldType = "text" | "textarea" | "date" | "select-multiple";

interface FieldOption {
  label: string;
  value: string | number;
}

interface Field {
  name: string;
  label: string;
  type: FieldType;
  value: string | string[]; // para input normal ou select-multiple
  options?: FieldOption[]; // só necessário no caso de select-multiple
}

interface GenericFormProps {
  fields: Field[];
  onChange: (name: string, value: string | string[]) => void;
  onSubmit: () => void;
  onCancel: () => void;
  loading?: boolean;
  title?: string;
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  onChange,
  onSubmit,
  onCancel,
  loading,
  title,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        )}

        <div className="space-y-4">
          {fields.map((field) => {
            if (field.type === "select-multiple") {
              return (
                <div key={field.name}>
                  <label className="block mb-1">{field.label}</label>
                  <select
                    multiple
                    value={field.value as string[]}
                    onChange={(e) =>
                      onChange(
                        field.name,
                        Array.from(e.target.selectedOptions, (opt) => opt.value)
                      )
                    }
                    className="w-full bg-zinc-800 text-white p-2 rounded-xl"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={field.name}>
                <label className="block mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value as string}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="w-full bg-zinc-800 text-white p-2 rounded-xl"
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-zinc-700 rounded-xl hover:bg-zinc-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 rounded-xl hover:bg-emerald-500 transition disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
