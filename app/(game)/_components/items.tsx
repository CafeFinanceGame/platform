"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaBasketShopping } from "react-icons/fa6";
import { CAFButton } from "@/components/ui/button";
import { PiLightningFill } from "react-icons/pi";
import { IoMdHeart } from "react-icons/io";
import { ListedItem, ProductItem as CAFProductItem, ProductItemType as ProductItemEnum, ProductItem as ProductItemType } from "@/types"
import clsx from "clsx"
import numeral from "numeral";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
    product: CAFProductItem;
    metadata?: any;
    listedItem?: ListedItem;
    customTools?: (product: CAFProductItem) => React.ReactNode;
}

export const ProductItem: React.FC<ProductItemProps> = (props) => {
    const {
        product,
        metadata,
        listedItem
    } = props;

    const productTypes = {
        [ProductItemEnum.COFFEE_BEAN]: {
            image: '/assets/item-product-coffee_bean.png',
            label: 'Coffee Bean',
        },
        [ProductItemEnum.COFFEE]: {
            image: '/assets/item-product-black_coffee.png',
            label: 'Black Coffee',
        },
        [ProductItemEnum.MILK]: {
            image: '/assets/item-product-milk.png',
            label: 'Milk',
        },
        [ProductItemEnum.WATER]: {
            image: '/assets/item-product-water.png',
            label: 'Water',
        },
        [ProductItemEnum.MACHINE_MATERIAL]: {
            image: '/assets/item-product-material_machine.png',
            label: 'Material Machine',
        },
        [ProductItemEnum.KETTLE]: {
            image: '/assets/item-product-kettle.png',
            label: 'Kettle',
        }
    } as any;

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
                <p>MFG, {formatTime(product.msgTime * 1e3)}</p>
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
                value: (new Date().getTime() > product.expTime) ? 0 : (product.msgTime - new Date().getTime()) * 100 / (product.expTime - product.msgTime),
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
            <img src={productTypes[product.productType].image} alt="Product Image" className="md:w-24 lg:w-32 aspect-square object-cover" />
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
            "relative w-fit min-w-60 aspect-[76/100] flex flex-col gap-2 items-center justify-center overflow-hidden",
            "hover:scale-105 transition-transform duration-300 ease-in-out"
        )}>
            <div
                className="w-64 h-64 rounded-full bg-primary-500/25 flex blur-3xl absolute right-0 top-0 z-0"
            />
            <div className={clsx(
                "rounded-[32px] border-2 border-default-200 z-10",
                "w-full h-full",
                "flex flex-col gap-2 p-4 items-center justify-center",
                "cursor-pointer"
            )}>
                <Header />
                <ProductImage />
                <Body />
                <Footer />
            </div>
            {props.customTools && props.customTools(product)}
        </div>
    )
}