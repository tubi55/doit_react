import { Link } from "react-router-dom";

export default function Logo({ title, desc }) {
  return (
    <nav>
      <h1 className="font-orbitron text-2xl theme-text font-[800] tracking-tight leading-none">
        <Link to="/">{title}</Link>
      </h1>
      <p className="text-xs font-semibold theme-text tracking-wider indent-0.5 opacity-50">
        {desc}
      </p>
    </nav>
  );
}
