export function Badge({ title, className, children }) {
  return (
    <span
      title={title}
      className={[className, "p-1 m-1 rounded-lg text-xs"].join(" ")}
    >
      {children}
    </span>
  );
}

export function GoldBadge({ title, children }) {
  return (
    <Badge className="bg-amber-300 text-black" title={title}>
      {children}
    </Badge>
  );
}

export function SilverBadge({ title, children }) {
  return (
    <Badge className="bg-gray-300 text-black" title={title}>
      {children}
    </Badge>
  );
}

export function BronzeBadge({ title, children }) {
  return (
    <Badge className="bg-yellow-500 text-black" title={title}>
      {children}
    </Badge>
  );
}
