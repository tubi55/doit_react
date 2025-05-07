import Logo from "./Logo";
import ToggleTheme from "./ToggleTheme";

export default function Header() {
  return (
    <header className="w-full px-[9vw] pt-[7vh] pb-[3vh] flex justify-between fixed top-0 left-0 z-100 max-xl:backdrop-blur-md">
      <Logo title="DCODELAB" desc="REVIEWING THE MOVIES" />
      <ToggleTheme />
    </header>
  );
}
