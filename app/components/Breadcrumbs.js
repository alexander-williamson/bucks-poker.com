import Link from "next/link";

export default function Breadcrumbs(props) {
  return (
    <nav
      className="pr-3 rounded font-sans w-full mr-4 mt-4 mb-4 bg-blue-50 rounded-lg
"
    >
      <ol className="list-reset flex text-grey-dark">
        <li>
          <Link href="/">
            <a className="text-blue font-bold ">Home</a>
          </Link>
        </li>
        {props.parentLink && (
          <>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={props.parentLink}>
                <a className="text-blue font-bold">{props.parent}</a>
              </Link>
            </li>
          </>
        )}
        <li>
          <span className="mx-2">/</span>
        </li>
        <li>{props.current}</li>
      </ol>
    </nav>
  );
}
