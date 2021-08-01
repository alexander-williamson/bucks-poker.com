export default function Breadcrumbs(props) {
  return (
    <nav className="p-3 rounded font-sans w-full my-4 bg-blue-50">
      <ol className="list-reset flex text-grey-dark">
        <li>
          <a href="/" className="text-blue font-bold ">
            Home
          </a>
        </li>
        <li>
          <span className="mx-2">/</span>
        </li>
        <li>{props.current}</li>
      </ol>
    </nav>
  );
}
