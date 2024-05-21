import React, { FC } from "react";
import { Select } from "@mantine/core";
import { useController, Control } from "react-hook-form";

interface FormSelectProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  data: string[];
  error: string | undefined;
}

const FormSelect: FC<FormSelectProps> = ({
  name,
  control,
  label,
  placeholder,
  data,
  error,
}) => {
  const { field } = useController({ name, control });

  return (
    <div>
      <label className="block mb-1">{label}:</label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Select
        {...field}
        data={data}
        placeholder={placeholder}
        classNames={{
          input: `!bg-neutral-100 ${
            error ? "!border-red-500" : "!border-neutral-400"
          } !transition-all !text-neutral-800`,
          dropdown: "!bg-neutral-100 !text-neutral-800",
          option: "hover:!bg-neutral-300",
        }}
      />
    </div>
  );
};

export default FormSelect;
