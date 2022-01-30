import joi from "joi";

export default function ResultsTable(props) {
  const { value, error } = joi
    .object({
      headers: joi.array().items(joi.string().required()).min(1).required(),
      rows: joi.array().items(joi.object().unknown().required()).required(),
    })
    .validate(props);
  if (error) throw error;

  return (
    <section className="container overflow-x-auto rounded-lg mb-5">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left bg-zinc-50 text-zinc-500 uppercase">
            {value.headers.map((header, index) => (
              <th className="border-0 px-4 py-3" key={`th-${index}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {value.rows.map((row, index) => (
            <tr className="text-gray-700 hover:bg-zinc-100" key={row.Person}>
              {Object.keys(row).map((key) => (
                <td className="border-0 px-4 py-3 border" key={`td-${index}`}>
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
