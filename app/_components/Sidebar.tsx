import { TbSmartHome } from "react-icons/tb";
import { GrGamepad } from "react-icons/gr";
import { BiStoreAlt } from "react-icons/bi";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { Logo } from "@/components/icons";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const Sidebar: React.FC<Props> = () => {
  const links = [
    {
      name: "Dashboard",
      icon: TbSmartHome,
      href: "/dashboard/company",
    },
    {
      name: "Games",
      icon: GrGamepad,
      href: "/games",
    },
    {
      name: "Marketplace",
      icon: BiStoreAlt,
      href: "/dashboard/marketplace",
    },
  ];

  return (
    <aside className="h-full w-24 p-2 z-10">
      <div className="flex flex-col items-center gap-8">
        <div className="rounded-full bg-default p-1">
          <Link className="w-fit h-fit" href="/">
            <Logo />
          </Link>
        </div>
        <ul className="p-1 rounded-full bg-default flex flex-col items-center justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <Button
                isIconOnly
                as={Link}
                className="hover:bg-default-200"
                href={link.href}
                radius="full"
                size="md"
                variant="light"
              >
                <link.icon size={20} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
