import { twMerge } from "tailwind-merge";

export default function ToggleList({ list, setList }) {
  return (
    <nav
      className={twMerge(
        "btn-toggle-list max-sm:right-[8vw] max-sm:scale-90",
        list ? "on" : ""
      )}
      onClick={() => setList(!list)}
    >
      <span>Toggle List</span>
    </nav>
  );
}
