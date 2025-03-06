"use client";

import { FaBasketShopping } from "react-icons/fa6";
import { CAFButton } from "@/components/ui/button";
import { ListedItem, ProductItemType as ProductItemEnum, ProductItem as ProductItemType } from "@/types"
import clsx from "clsx"
import numeral from "numeral";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
    product: ProductItemType;
    metadata?: any;
    listedItem?: ListedItem;
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
        [ProductItemEnum.BLACK_COFFEE]: {
            image: '/assets/item-product-black_coffee.png',
            label: 'Black Coffee',
        },
        [ProductItemEnum.MILK_COFFEE]: {
            image: '/assets/item-product-milk_coffee.png',
            label: 'Milk Coffee',
        },
        [ProductItemEnum.POWDERED_MILK]: {
            image: '/assets/item-product-powdered_milk.png',
            label: 'Powered Milk',
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
        },
        [ProductItemEnum.MILK_FROTHER]: {
            image: '/assets/item-product-milk_frother.png',
            label: 'Milk Frother',
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
        return (
            <div className={clsx(
                "flex flex-row items-center justify-between w-full",
                "text-xs font-normal"
            )}>
                <p>EXP, {new Date(product.expTime).toLocaleDateString()}</p>
                <p>MFG, {new Date(product.msgTime).toLocaleDateString()}</p>
            </div>
        )
    }

    const Body = () => {
        return (
            <div className="flex flex-1 items-center justify-end w-full">
                <p className="text-4xl font-semibold">
                    {productTypes[product.productType].label}
                </p>
            </div>
        )
    }
    const ProductImage = () => {
        return (
            <img src={productTypes[product.productType].image} alt="Product Image" className="md:w-32 lg:w-64 aspect-square object-cover" />
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
        <div className="relative w-fit min-w-80 aspect-[7/10] flex flex-col gap-2 items-center justify-center overflow-hidden">
            <div
                className="w-64 h-64 rounded-full bg-primary-500/25 flex blur-3xl absolute right-0 top-0 z-0"
            />
            <div className={clsx(
                "rounded-[32px] border-2 border-default-200 z-10",
                "w-full h-full",
                "flex flex-col gap-2 p-4 items-center justify-center"
            )}>
                <Header />
                <ProductImage />
                <Body />
                <Footer />
            </div>
            <MarketplaceTools />
        </div>
    )
}