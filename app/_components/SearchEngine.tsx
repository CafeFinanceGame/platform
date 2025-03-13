"use client";

import { Input } from "@heroui/input";
import { IoSearch } from "react-icons/io5";
import { useGlobalState } from "../_hooks/useGlobalState";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLInputElement> { }
export const SearchEngine: React.FC<Props> = (props) => {
  const { searchKeyword, setSearchKeyword } = useGlobalState();

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
      value={searchKeyword}
      onChange={(e) => setSearchKeyword(e.target.value)}
    />
  );
};
