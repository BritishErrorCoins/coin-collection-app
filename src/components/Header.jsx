import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "/public/logo.jpg";

const pages = [
  { name: "Dashboard", path: "/" },
  { name: "My Collection", path: "/collection" },
  { name: "Missing", path: "/missing" },
  { name: "Sold", path: "/sold" },
];

export default function Header({ children }) {
  const location = useLocation();

  return (
    <header className="bg-[#800020] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center mb-4">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="space-x-4">
          {pages.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className={`${location.pathname === p.path ? "underline" : "hover:opacity-80"}`}
            >
              {p.name}
            </Link>
          ))}
        </nav>
      </div>
      <div>{children}</div>
    </header>
  );
}