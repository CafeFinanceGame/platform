import { Input } from "@heroui/input"
import { IoSearch } from "react-icons/io5"

interface Props extends React.HTMLAttributes<HTMLInputElement> { }
export const SearchEngine: React.FC<Props> = (props) => {
    return (
        <Input
            type="search"
            placeholder="Search..."
            variant="bordered"
            radius="full"
            size="lg"
            className="w-full max-w-screen-sm"
            classNames={{
                inputWrapper: "border-foreground",
            }}
            startContent={<IoSearch />}
        />
    )
}