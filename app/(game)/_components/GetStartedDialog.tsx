"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { CAFButton } from "@/components/ui/button";
import { IoPlayCircle } from "react-icons/io5";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const GetStartedDialog: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { open } = useAppKit();
    const { isConnected } = useAccount();

    return (
        <>
            <CAFButton
                className="w-fit"
                startContent={<IoPlayCircle size={24} />}
                onPress={onOpen}
            >
                Play
            </CAFButton>
            <Modal isOpen={isOpen} onClose={close} onOpenChange={onOpenChange} classNames={{
                base: "bg-default rounded-2xl",
            }}>
                <ModalContent className="text-default-foreground">
                    <div
                        className="absolute rounded-full bg-primary blur-[64px] w-1/4 aspect-square pointer-events-none left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-[-1]"
                    />
                    <ModalHeader className="flex flex-col gap-1 items-center">
                        <h1 className="text-4xl font-semibold">Get Started</h1>
                        <p className="text-base font-normal text-default-500">Please connect to <span className="text-primary">PLAY</span> or <span className="text-primary">START</span></p>
                    </ModalHeader>
                    <ModalBody>
                        <p>Get started with CoFi Game by creating an account and start playing with your friends.</p>
                    </ModalBody>
                    <ModalFooter className="flex flex-row gap-4 items-end justify-end">
                        <CAFButton onPress={onClose}>
                            Cancel
                        </CAFButton>
                        <CAFButton
                            isDisabled={isConnected}
                            onPress={() => open()}
                            className={clsx(
                                "text-default-900",
                                isConnected ? "bg-default-500 cursor-not-allowed" : "bg-default-50 hover:bg-primary hover:text-default"
                            )}
                        >
                            {isConnected ? "Connected" : "Connect"}
                        </CAFButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}