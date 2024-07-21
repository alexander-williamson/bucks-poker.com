export function StatsCard({ title, className, value }) {
  return (
    <div title={title} className="p-5 m-5">
      <p className="text-2xl font-semibold text-center">{value}</p>
      <p className="text-base text-center text-slate-500">{title}</p>
    </div>
  );
}
