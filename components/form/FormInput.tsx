import React, { FC } from "react";
import { Input } from "@mantine/core";
import { useController, Control } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  error: string | undefined;
  type?: string;
}

const FormInput: FC<FormInputProps> = ({
  name,
  control,
  label,
  placeholder,
  error,
  type = "text",
}) => {
  const { field } = useController({ name, control });

  return (
    <div>
      <label className="block mb-1">{label}:</label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        {...field}
        placeholder={placeholder}
        type={type}
        classNames={{
          input: `!bg-neutral-100 ${
            error ? "!border-red-500" : "!border-neutral-400"
          } !transition-all !text-neutral-800`,
        }}
      />
    </div>
  );
};

export default FormInput;
