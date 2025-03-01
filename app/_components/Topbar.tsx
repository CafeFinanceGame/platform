import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarBrand
} from "@heroui/navbar";
import NextLink from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Topbar: React.FC<Props> = () => {
    return (
        <HeroUINavbar maxWidth="full" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">ACME</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                </ul>
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
}