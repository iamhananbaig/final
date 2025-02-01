"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

type Invoice = {
  invoiceNumber: string;
  invoiceDate: string;
  status: string;
  amount: number;
  paid: boolean;
  remarks: string;
};

type FormValues = {
  vendor: number | null;
  serviceMonth: string;
  invoices: Invoice[];
};

export default function InvoiceForm() {
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      vendor: 1,
      serviceMonth: "",
      invoices: [
        {
          invoiceNumber: "",
          invoiceDate: "",
          status: "",
          amount: 0,
          paid: false,
          remarks: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoices",
  });

  // Simulating an API call (without Lodash)

  const fetchOptions = (query: string) => {
    if (query.length < 3) {
      return []; // Return empty results if input is too short
    }
    const vendors = [
      { ntn: "ABC", name: "Vendor A", id: 3 },
      { ntn: "ABC", name: "Vendor B", id: 2 },
      { ntn: "ABC", name: "Vendor C", id: 1 },
    ];
    return vendors.map((vendor) => ({
      label: `${vendor.name} - ${vendor.ntn}`, // Change based on API response
      value: vendor.id,
    }));
  };

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Vendor:</label>
        <Controller
          name="vendor"
          control={control}
          rules={{ required: "Vendor is required" }}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              instanceId="vendor-select"
              cacheOptions
              defaultOptions
              loadOptions={fetchOptions}
              placeholder="Search for a vendor..."
              isClearable
            />
          )}
        />
      </div>

      <div>
        <label>Service Month:</label>
        <input {...register("serviceMonth", { required: true })} type="month" />
      </div>

      <div>
        <h3>Invoices</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <label>Invoice Number:</label>
            <input
              {...register(`invoices.${index}.invoiceNumber`, {
                required: true,
              })}
              type="text"
            />

            <label>Invoice Date:</label>
            <input
              {...register(`invoices.${index}.invoiceDate`, { required: true })}
              type="date"
            />

            <label>Status:</label>
            <select
              {...register(`invoices.${index}.status`, { required: true })}
            >
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <label>Amount:</label>
            <input
              {...register(`invoices.${index}.amount`, {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
            />

            <label>Paid:</label>
            <input {...register(`invoices.${index}.paid`)} type="checkbox" />

            <label>Remarks:</label>
            <input {...register(`invoices.${index}.remarks`)} type="text" />

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              invoiceNumber: "",
              invoiceDate: "",
              status: "",
              amount: 0,
              paid: false,
              remarks: "",
            })
          }
        >
          Add Invoice
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
