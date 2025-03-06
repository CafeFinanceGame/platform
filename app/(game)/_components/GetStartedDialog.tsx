"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { CAFButton } from "@/components/ui/button";
import { IoPlayCircle } from "react-icons/io5";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import clsx from "clsx";
import { CreateCompanyForm } from "./CreateCompanyForm";
import { useCompanyActions } from "@/hooks/useCAFItems";
import React from "react";
import { useRouter } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}
export const GetStartedDialog: React.FC<Props> = () => {
    const { hasCompany } = useCompanyActions();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ownerHasCompany, setOwnerHasCompany] = React.useState(false);
    const { open } = useAppKit();
    const { isConnected, address } = useAccount();
    const router = useRouter();

    const checkCompanyOwnership = React.useCallback(async () => {
        if (isConnected && address) {
            const result = await hasCompany(address);
            setOwnerHasCompany(result);
        }
    }, [isConnected, address]);

    React.useEffect(() => {
        checkCompanyOwnership();
    }, [checkCompanyOwnership]);


    return (
        <>
            <CAFButton
                className="w-fit"
                startContent={<IoPlayCircle size={24} />}
                onPress={() => {
                    ownerHasCompany ? router.push('/dashboard/company') : onOpen();
                }}
            >
                {address ? "Play" : "Get Started"}
            </CAFButton>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                    base: "bg-default rounded-2xl",
                    closeButton: "hidden",
                }}
            >
                <ModalContent className="text-default-foreground">
                    <div
                        className="absolute rounded-full bg-primary/50 blur-[64px] w-32 aspect-square pointer-events-none left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-[-1]"
                    />
                    <ModalHeader className="flex flex-col gap-1 items-center">
                        <h1 className="text-4xl font-semibold">Get Started</h1>
                        <p className="text-base font-normal text-default-500">Please connect to <span className="text-primary">PLAY</span> or <span className="text-primary">START</span></p>
                    </ModalHeader>
                    <ModalBody>
                        <CreateCompanyForm hasCompany={ownerHasCompany} />
                    </ModalBody>
                    <ModalFooter className="flex flex-row gap-4 items-end justify-end">
                        <CAFButton onPress={onClose}>
                            Cancel
                        </CAFButton>
                        <CAFButton
                            variant={isConnected ? "bordered" : "solid"}
                            onPress={() => {
                                open();
                            }}
                            className={clsx(
                                "text-default-900",
                                isConnected ? "border-default-500 text-default-500 font-medium" : "bg-default-50 hover:bg-primary hover:text-default"
                            )}
                        >
                            {
                                address ? address.slice(0, 6) + "..." + address.slice(-4) : "Connect"
                            }
                        </CAFButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}