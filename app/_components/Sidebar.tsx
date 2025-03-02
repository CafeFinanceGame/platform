import { Logo } from "@/components/icons";
import { TbSmartHome } from "react-icons/tb";
import { GrGamepad } from "react-icons/gr";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Sidebar: React.FC<Props> = () => {
    const links = [
        {
            name: "Dashboard",
            icon: TbSmartHome,
            href: "/",
        },
        {
            name: "Games",
            icon: GrGamepad,
            href: "/games",
        },
    ];

    return (
        <aside className="h-full w-24 p-2 z-10">
            <div className="flex flex-col items-center gap-8">
                <Logo />
                <ul className="p-1 rounded-full bg-default flex flex-col items-center justify-center">
                    {
                        links.map((link) => (
                            <li key={link.href}>
                                <Button
                                    as={Link}
                                    href={link.href}
                                    radius="full"
                                    variant="light"
                                    size="md"
                                    isIconOnly
                                >
                                    <link.icon size={20} />
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    );
};