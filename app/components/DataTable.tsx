import joi from "joi";

export type DataTableProps<T extends Record<string, any>> = {
  headers: HeaderDefinition<T>[];
  rows: T[];
};

export type HeaderDefinition<T> = { key: keyof T; label: string; hidden?: boolean };

export default function DataTable<T>({ tableData }: { tableData: DataTableProps<T> }) {
  const { value, error } = joi
    .object<DataTableProps<T>>({
      headers: joi
        .array()
        .items(
          joi
            .object({
              key: joi.string().required(),
              label: joi.string().empty("").optional(),
              hidden: joi.boolean().default(false).optional(),
            })
            .required(),
        )
        .min(1),
      rows: joi.array().items(joi.object().required()).required(),
    })
    .validate(tableData);

  if (error) {
    console.info(JSON.stringify(tableData));
    throw error;
  }

  return (
    <div className="container overflow-x-auto rounded-lg mb-5">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left bg-zinc-50 text-zinc-500 uppercase">
            {value.headers
              .filter((x) => x.hidden !== true)
              .map((header, index) => (
                <th className="border-0 px-4 py-3" key={`th-${index}`}>
                  {header.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {value.rows.map((row, index) => (
            <tr className="text-gray-700 hover:bg-zinc-100" key={row.id}>
              {Object.keys(row)
                .filter((key) => value.headers.find((headerKey: HeaderDefinition<T>) => headerKey.key === key)?.hidden !== true)
                .map((key) => (
                  <td className="border-0 px-4 py-3 border" key={`td-${index}`}>
                    {row[key]}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
