"use client";

import React from "react";
import { useAccount, useWatchContractEvent } from "wagmi";
import { Select, Selection, SelectItem } from "@heroui/react";
import { FaBuilding } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti'
import { useCompanyStore } from "../dashboard/_hooks/useCompanyStore";

import CAFItemsManagerAbis from "@/abis/CAFItemsManager";
import { CAFButton } from "@/components/ui/button";
import { CompanyType } from "@/types";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";

export const companies = [
  {
    key: CompanyType.COFFEE_COMPANY,
    label: "Coffee Company",
  },
  {
    key: CompanyType.MACHINE_COMPANY,
    label: "Machine Company",
  },
  {
    key: CompanyType.MATERIAL_COMPANY,
    label: "Material Company",
  },
];
interface Props extends React.HTMLAttributes<HTMLFormElement> {
  hasCompany: boolean;
}
export const CreateCompanyForm: React.FC<Props> = (props) => {
  const { hasCompany } = props;
  const { createCompanyItem } = useCAFItemsManagerActions();
  const { isConnected, address } = useAccount();
  const { company, setCompany } = useCompanyStore();
  const [role, setRole] = React.useState<Selection>(new Set([]));
  const router = useRouter();

  const [showConfetti, setShowConfetti] = React.useState(false);

  useWatchContractEvent({
    abi: CAFItemsManagerAbis,
    eventName: "CompanyItemCreated",
    onLogs: (logs) => {
      const parsedRole = Array.from(role as Set<CompanyType>);

      setCompany({
        ...company,
        id: Number(logs[0]?.args?.companyId),
        role: parsedRole[0],
      });
    },
  });

  const { mutate: createCompany, isPending: isCreating } = useMutation({
    mutationKey: ["createCompany", address],
    mutationFn: async () => {
      if (!role) {
        addToast({
          color: "warning",
          title: "Warning",
          description: "Please select a company to create",
        });

        return;
      }
      if (!address) {
        addToast({
          color: "warning",
          title: "Warning",
          description: "Please connect your wallet to create a company",
        });

        return;
      }

      const parsedRole = Array.from(role as Set<CompanyType>);

      await createCompanyItem(address, parsedRole[0]);
    },
    onError: (error) => {
      addToast({
        color: "danger",
        title: "Error",
        description: "Error creating company",
      });
    },
    onSuccess: () => {
      addToast({
        color: "success",
        title: "Success",
        description: "Company created successfully",
      });
      setShowConfetti(true);
      setTimeout(() => {
        router.push("/dashboard/company");
      }, 2000);
    },
  });

  if (!isConnected) return null;
  if (hasCompany) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {showConfetti && <Confetti
        className="absolute top-0 left-0 w-full h-full z-50"
        recycle={true}
        gravity={0.5}
        initialVelocityX={5}
        initialVelocityY={-10}
      />}
      <Select
        classNames={{
          label: "text-default-500",
          innerWrapper: "border-default-100",
          popoverContent: "bg-white",
          listbox: "text-black",
        }}
        description="Should consider selecting a company"
        items={companies}
        label="Select a company"
        placeholder="Select a company to start playing"
        startContent={<FaBuilding />}
        variant="bordered"
        onSelectionChange={setRole}
      >
        {(company) => (
          <SelectItem key={company.key} className="light">
            {company.label}
          </SelectItem>
        )}
      </Select>
      <CAFButton
        color="primary"
        isLoading={isCreating}
        onPress={() => {
          createCompany();
        }}
      >
        Create Company
      </CAFButton>
    </div>
  );
};
