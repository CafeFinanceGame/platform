import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";

import { Navbar1 } from "./Navbar1";
import { SearchEngine } from "./SearchEngine";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Topbar: React.FC<Props> = () => {
  return (
    <HeroUINavbar
      isBlurred
      className="bg-transparent backdrop-blur-none"
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="w-full" justify="center">
        <div className="w-full flex flex-row items-center justify-between">
          <SearchEngine />
          <Navbar1 />
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};
