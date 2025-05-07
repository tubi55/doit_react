import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    isDarkMode
      ? document.documentElement.setAttribute("data-mode", "dark")
      : document.documentElement.removeAttribute("data-mode");
  }, [isDarkMode]);

  return (
    <div className=" w-14 h-[29px] bg-black/7 shadow-inner shadow-black-500/80 rounded-4xl p-1 border-b border-white/30 saturate-150 max-sm:-translate-x-[10vw] max-sm:scale-80">
      <button
        className={twMerge(
          "size-5 rounded-full  cursor-pointer transition duration-500 shadow-md opacity-70 bg-[oklch(var(--point-color))] ]",
          isDarkMode ? "translate-x-0 " : "translate-x-7"
        )}
        onClick={() => setIsDarkMode((prev) => !prev)}
      ></button>
    </div>
  );
}
