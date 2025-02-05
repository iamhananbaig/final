"use client";

import { useForm, Controller } from "react-hook-form";
import ComboboxDemo from "./_components/combobox";

export default function DashboardPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      vendor: null, // Ensure default value is null (matches ComboboxDemo type)
    },
  });

  const vendors = [
    { value: 1, label: "React" },
    { value: 2, label: "Vue" },
    { value: 3, label: "Angular" },
  ];

  type FormData = {
    vendor: number | null;
  };

  const onSubmit = (data: FormData) => {
    console.log("Selected Vendor:", data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select a Vendor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="vendor"
          control={control}
          render={({ field }) => (
            <ComboboxDemo
              options={vendors}
              value={field.value}
              onChangeAction={field.onChange}
            />
          )}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
