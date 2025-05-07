import { twMerge } from "tailwind-merge";

export default function Spinner({
  size = "size-20",
  color = "border-sky-500",
  frameStyle,
}) {
  return (
    <section
      className={twMerge(
        "size-full bg-[rgb(var(--theme-bg/50))] backdrop-blur fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex justify-center items-center",
        frameStyle
      )}
    >
      <div
        className={`${size} ${color} border-4 border-t-transparent rounded-full animate-spin`}
      />
    </section>
  );
}
