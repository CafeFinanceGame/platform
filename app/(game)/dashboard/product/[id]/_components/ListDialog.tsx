"use client";

import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { FaTags } from "react-icons/fa6";
import React from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import { useMarketplaceStore } from "../../../_hooks/useMarketplaceStore";

import { useCAFMarketplace } from "@/hooks/useCAFMarketplace";
import { CAFButton } from "@/components/ui/button";

type FormFields = {
  price: number;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const ListDialog: React.FC<Props> = () => {
  const params = useParams();
  const id = Number(params.id);
  const [price, setPrice] = React.useState(0);

  const account = useAccount();
  const { listedItems, setListedItem } = useMarketplaceStore();
  const { list } = useCAFMarketplace();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    mutate: listItem,
    isPending: isListing,
    isSuccess: isListSuccess,
    isError: isListError,
  } = useMutation({
    mutationKey: ["marketplace", "list"],
    mutationFn: async (price: number) => {
      if (price <= 0) {
        throw new Error("Price must be greater than 0");
      }

      if (!account.isConnected) {
        throw new Error("Please connect your wallet");
      }

      await list(id, price);
    },
    onMutate: async (price) => {
      const previousItem = listedItems[id];

      setListedItem(id, {
        id,
        price,
        owner: account.address as string,
      });

      return { previousItem };
    },
    onSuccess: () => {
      setListedItem(id, {
        id,
        price: 0,
        owner: account.address as string,
      });
      addToast({
        color: "success",
        title: "Success",
        description: "Item has been listed",
      });
      onClose();
    },
    onError: (error, _, context) => {
      if (context?.previousItem) {
        setListedItem(id, context.previousItem);
      }

      addToast({
        color: "danger",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <>
      <CAFButton
        isLoading={isListing}
        startContent={<FaTags />}
        onClick={onOpen}
      >
        List
      </CAFButton>
      <Modal
        classNames={{
          base: "rounded-2xl",
          closeButton: "hidden",
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center">
            <h1 className="text-4xl font-semibold">List Item</h1>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input
              placeholder="Enter price"
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </ModalBody>
          <ModalFooter className="flex justify-end gap-4">
            <CAFButton
              isDisabled={isListing}
              isLoading={isListing}
              onPress={() => {
                listItem(price);
              }}
            >
              List now
            </CAFButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
