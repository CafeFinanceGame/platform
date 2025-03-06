import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarBrand
} from "@heroui/navbar";
import NextLink from "next/link";
import { Navbar1 } from "./Navbar1";
import { SearchEngine } from "./SearchEngine";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Topbar: React.FC<Props> = () => {
    return (
        <HeroUINavbar maxWidth="full" position="sticky" isBlurred className="bg-transparent">
            <NavbarContent justify="center" className="w-full">
                <div className="w-full flex flex-row items-center justify-between">
                    <SearchEngine />
                    <Navbar1 />
                </div>
            </NavbarContent>
        </HeroUINavbar>
    );
}