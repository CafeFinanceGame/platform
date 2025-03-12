"use client";

import { Button } from "@heroui/button";
import { Image, User } from "@heroui/react";
import { useAppKit } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import numeral from "numeral";
import { PiLightningFill } from "react-icons/pi";

import { useCAFToken } from "@/hooks/useTokenomics";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
import { CompanyType } from "@/types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const Navbar1: React.FC<Props> = () => {
  const { open } = useAppKit();
  const { address } = useAccount();
  const { balanceOf } = useCAFToken();
  const { getCompanyItem, getCompanyItemIdByOwner } =
    useCAFItemsManagerActions();

  const {
    data: balance,
    isSuccess,
    isError,
    isLoading: isBalanceLoading,
  } = useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      if (address) {
        const balance = await balanceOf(address);

        return balance / 1e18;
      }
    },
    enabled: !!address,
  });

  const {
    data: company,
    isSuccess: isCompanySuccess,
    isError: isCompanyError,
    isLoading: isCompanyLoading,
  } = useQuery({
    queryKey: ["company", address],
    queryFn: async () => {
      if (address) {
        const companyId = await getCompanyItemIdByOwner(address);
        const company = await getCompanyItem(companyId);

        return company;
      }
    },
    enabled: !!address,
  });

  const Resources = () => {
    if (!address) return null;

    return (
      <ul className="flex flex-row text-foreground">
        <Button
          as={"li"}
          className="p-0 text-foreground h-fit"
          isLoading={isBalanceLoading}
          startContent={
            <Image
              alt="CaFi Token"
              className="w-5 aspect-square"
              src="/assets/cafi-token.png"
            />
          }
          variant="light"
        >
          {isSuccess ? numeral(balance).format("0.0a") : "0"}
        </Button>
        <Button
          as={"li"}
          className="p-0 text-foreground h-fit"
          isLoading={isCompanyLoading}
          startContent={<PiLightningFill className="text-primary" size={20} />}
          variant="light"
        >
          {isCompanySuccess ? company?.energy : "0"}
        </Button>
      </ul>
    );
  };

  if (isCompanyError || isError || company?.role === CompanyType.UNKNOWN)
    return null;

  return (
    <>
      {isCompanyLoading ? (
        <></>
      ) : (
        <User
          avatarProps={{
            color: "primary",
          }}
          classNames={{
            name: "font-semibold text-base pl-1",
          }}
          description={<Resources />}
          name="Company"
          onClick={() => open()}
        />
      )}
    </>
  );
};
