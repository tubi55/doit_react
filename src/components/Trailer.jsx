export default function Trailer({ trailer, movieDataById }) {
  return (
    <>
      <h2 className="theme-text text-2xl mb-2 font-orbitron font-[600] opacity-80 drop-shadow-md -translate-y-1">
        Trailer - {movieDataById.original_title}
      </h2>
      <iframe
        className="w-full h-[90%] object-cover"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </>
  );
}
