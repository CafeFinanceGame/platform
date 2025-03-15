"use client";

import { Button } from "@heroui/button";
import { Chip, Image, User } from "@heroui/react";
import { useAppKit } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import numeral from "numeral";
import { PiLightningFill } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useCAFToken } from "@/hooks/useTokenomics";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
import { CompanyType } from "@/types";
import { CAFButton, soundClick } from "@/components/ui/button";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Navbar1: React.FC<Props> = () => {
  const { open } = useAppKit();
  const { address } = useAccount();
  const { balanceOf } = useCAFToken();
  const { getCompanyItem, getCompanyItemIdByOwner, useEnergy } =
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
      <ul className="flex flex-row items-center text-foreground w-fit">
        <Chip
          as={"li"}
          className="p-0 text-foreground h-fit"
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
        </Chip>
        <Chip
          as={"li"}
          variant="light"
          className="p-0 text-foreground h-fit hover:bg-transparent"
          startContent={<PiLightningFill className="text-primary" size={20} />}
          endContent={
            <CAFButton
              variant="light"
              startContent={<IoIosAddCircleOutline size={20} className="text-foreground" />}
              isIconOnly
            />
          }
        >
          {isCompanySuccess ? company?.energy : "0"}
        </Chip>
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
          onClick={() => {
            soundClick.play();
            open();
          }}
        />
      )}
    </>
  );
};
