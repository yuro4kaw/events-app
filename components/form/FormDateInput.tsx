// components/FormDateInput.tsx
import React, { FC } from "react";
import { DateInput } from "@mantine/dates";
import { useController, Control } from "react-hook-form";

interface FormDateInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  error: string | undefined;
}

const FormDateInput: FC<FormDateInputProps> = ({
  name,
  control,
  label,
  placeholder,
  error,
}) => {
  const { field } = useController({ name, control });

  return (
    <div>
      <label className="block mb-1">{label}:</label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <DateInput
        {...field}
        placeholder={placeholder}
        classNames={{
          input: `!bg-neutral-100 ${
            error ? "!border-red-500" : "!border-neutral-400"
          } !transition-all !text-neutral-800`,
        }}
      />
    </div>
  );
};

export default FormDateInput;
