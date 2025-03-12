import { Input } from "@heroui/input";
import { IoSearch } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLInputElement> {}
export const SearchEngine: React.FC<Props> = (props) => {
  return (
    <Input
      className="w-full max-w-screen-sm"
      classNames={{
        inputWrapper: "border-foreground",
      }}
      placeholder="Search..."
      radius="full"
      size="lg"
      startContent={<IoSearch />}
      type="search"
      variant="bordered"
    />
  );
};
