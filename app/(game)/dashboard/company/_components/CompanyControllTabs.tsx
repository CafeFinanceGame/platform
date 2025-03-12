"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { AiOutlineProduct } from "react-icons/ai";
import React from "react";

import { Products } from "./Products";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const CompanyControllTabs: React.FC<Props> = () => {
  const tabs = React.useMemo(
    () => [
      {
        title: "Products",
        icon: <AiOutlineProduct />,
        content: <Products />,
      },
      {
        title: "Company Profile",
        icon: null,
        content: null,
      },
    ],
    [],
  );

  return (
    <Tabs variant="underlined">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          aria-label={tab.title}
          title={
            <div className="flex items-center space-x-2">
              <AiOutlineProduct />
              <span>{tab.title}</span>
            </div>
          }
        >
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};
