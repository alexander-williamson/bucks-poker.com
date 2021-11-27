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
    <section className="container mx-auto">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full ">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-blue-900 bg-gray-100 uppercase border-b border-gray-600">
                {value.headers.map((header, index) => (
                  <th className="px-4 py-3" key={`th-${index}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {value.rows.map((row, index) => (
                <tr className="text-gray-700" key={`tr-${index}`}>
                  {Object.keys(row).map((key) => (
                    <td className="px-4 py-3 border" key={`td-${index}`}>
                      {row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
