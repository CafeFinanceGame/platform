import { ListedItem, ProductItem, ProductItemType } from "@/types";

export const productItems: ProductItem[] = [
    {
        energy: 10,
        durability: 0,
        expTime: new Date().getTime() + 1000 * 60 * 60 * 24,
        msgTime: 0,
        price: 10,
        productType: ProductItemType.COFFEE_BEAN,
    },
    {
        energy: 15,
        durability: 0,
        expTime: new Date().getTime() + 1000 * 60 * 60 * 24,
        msgTime: 0,
        price: 15,
        productType: ProductItemType.MILK,
    },
    {
        energy: 20,
        durability: 0,
        expTime: new Date().getTime() + 1000 * 60 * 60 * 24,
        msgTime: 0,
        price: 20,
        productType: ProductItemType.BLACK_COFFEE,
    }
]
export const listedItems: ListedItem[] = [
    {
        id: 1,
        price: 10,
        owner: '0x0D78A621e71CfeA0d52Cb51C1163adf1457FCF84',
    },
    {
        id: 2,
        price: 15,
        owner: '0x0FB21B681313957dF811f34B8936C840946B0538',
    },
    {
        id: 3,
        price: 20,
        owner: '0x0ABF1B681313957dF811f34B8936C840946B0538',
    }
];