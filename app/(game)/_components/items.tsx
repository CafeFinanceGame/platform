"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaBasketShopping } from "react-icons/fa6";
import { CAFButton } from "@/components/ui/button";
import { PiLightningFill } from "react-icons/pi";
import { IoMdHeart } from "react-icons/io";
import { ListedItem, ProductItem as CAFProductItem, ProductItemType as ProductItemEnum, ProductItem as ProductItemType } from "@/types"
import clsx from "clsx"
import numeral from "numeral";
import constants from "@/utils/constants";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
    product: CAFProductItem;
    metadata?: any;
    listedItem?: ListedItem;
    customTools?: (product: CAFProductItem) => React.ReactNode;
}

export const ProductItemCard: React.FC<ProductItemProps> = (props) => {
    const {
        product,
        metadata,
        listedItem
    } = props;

    const productTypes = constants.images;

    const Header = () => {
        return (
            <div>
                <p>Made in <b>Company</b></p>
            </div>
        )
    }

    const Footer = () => {
        const formatTime = (time: number) => {
            return new Date(time).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }).replace(",", "")
        }
        return (
            <div className={clsx(
                "flex flex-row items-center justify-between w-full",
                "text-[8pt] font-normal"
            )}>
                <p>EXP, {formatTime(product.expTime * 1e3)}</p>
                <p>MFG, {formatTime(product.mfgTime * 1e3)}</p>
            </div>
        )
    }

    const Body = () => {
        const progressFields = [
            {
                label: 'Quality',
                value: product.energy,
                icon: <PiLightningFill className="text-white" size={12} />
            },
            {
                label: 'Freshness',
                value: (new Date().getTime() > product.expTime) ? 0 : (product.mfgTime - new Date().getTime()) * 100 / (product.expTime - product.mfgTime),
                icon: <IoMdHeart className="text-white" size={12} />
            }
        ];

        const ProgressField = ({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) => {
            return (
                <div className="w-6 aspect-square relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {icon}
                    </div>
                    <CircularProgressbar
                        value={value}
                        styles={buildStyles({
                            pathColor: '#fff',
                            trailColor: 'rgba(255,255,255,0.25)',
                        })}
                    />
                </div>
            )
        };

        return (
            <div className="flex flex-1 items-center justify-between w-full">
                <div className="flex flex-col gap-2 items-center justify-center p-1">
                    {
                        progressFields.map(({ label, value, icon }) => (
                            <ProgressField
                                key={label}
                                label={label}
                                value={value}
                                icon={icon}
                            />
                        ))
                    }
                </div>
                <p className="text-2xl font-semibold">
                    {productTypes[product.productType].label}
                </p>
            </div>
        )
    }

    const ProductImage = () => {
        return (
            <img src={productTypes[product.productType].image} alt="Product Image"
                className={clsx(
                    "md:w-24 lg:w-32 aspect-square object-cover",
                    "group-hover::scale-[1.01] transition-transform duration-300 ease-in-out"
                )}
            />
        )
    }

    const MarketplaceTools = () => {
        return (
            <div className="w-full">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-base font-medium text-default-500">#{listedItem?.id}</p>
                    <p className="font-medium">
                        {numeral(listedItem?.price).format('0,0')} CAF
                    </p>
                    <CAFButton
                        size="sm"
                        startContent={<FaBasketShopping />}
                    >
                        Buy now
                    </CAFButton>
                </div>
            </div>
        )
    }

    return (
        <div className={clsx(
            "relative w-fit flex flex-col gap-2 items-center justify-center"
        )}>
            <div className={clsx(
                "relative rounded-[32px] border-2 border-default-200 z-10 overflow-hidden",
                "w-full min-w-60 aspect-[76/100]",
                "flex flex-col gap-2 p-4 items-center justify-center",
                "cursor-pointer",
            )}>
                <div
                    className="w-64 h-64 rounded-full bg-primary-500/25 flex blur-3xl absolute right-0 top-0 z-0"
                />
                <Header />
                <ProductImage />
                <Body />
                <Footer />
            </div>
            {props.customTools && props.customTools(product)}
        </div>
    )
}