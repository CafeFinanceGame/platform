import { Navbar1 } from "../_components/Navbar1";
import { SearchEngine } from "../_components/SearchEngine";

export default async function Layout({ children }: {
    children: any;
}) {
    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-row items-center">
                <SearchEngine />
                <Navbar1 />
            </div>
            {children}
        </div>
    );
}
