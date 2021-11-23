export default function ResultsTable(props) {
  return (
    <section className="container mx-auto">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full ">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-blue-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Points</th>
                <th className="px-4 py-3">Chips</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {props.data.map((row) => (
                <tr className="text-gray-700" key={row.Person}>
                  <td className="px-4 py-3 border">{row.Person}</td>
                  <td className="px-4 py-3 font-semibold border">
                    {row.SRank}
                  </td>
                  <td className="px-4 py-3 border">{row.Points}</td>
                  <td className="px-4 py-3 text-sm border">{row.Chips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
