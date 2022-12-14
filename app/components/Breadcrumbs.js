import Link from "next/link";

export default function Breadcrumbs({ parentLink, parent, children }) {
  return (
    <nav
      className="pr-3 rounded font-sans w-full mr-4 mt-4 mb-4 bg-blue-50 rounded-lg
"
    >
      <ol className="list-reset flex text-grey-dark">
        <li>
          <Link href="/" className="text-blue font-bold ">
            Home
          </Link>
        </li>
        {parentLink && (
          <>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={parentLink} className="text-blue font-bold">
                {parent}
              </Link>
            </li>
          </>
        )}
        <li>
          <span className="mx-2">/</span>
        </li>
        <li>{children}</li>
      </ol>
    </nav>
  );
}
