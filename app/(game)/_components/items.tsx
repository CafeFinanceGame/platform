import clsx from "clsx"

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> { }
export const ProductItem: React.FC<ProductItemProps> = () => {
    const Header = () => {
        return (
            <div>
                <p>Made in <b>Company Name</b></p>
            </div>
        )
    }
    const Footer = () => {
        return (
            <div className={clsx(
                "flex flex-row items-center justify-between w-full",
                "text-xs font-normal"
            )}>
                <p>EXP, 20Feb, 2025</p>
                <p>MFG, 20 Jan, 2025</p>
            </div>
        )
    }
    const Body = () => {
        return (
            <div className="flex flex-1 items-center justify-end w-full">
                <p className="text-4xl font-semibold">Coffee Cup</p>
            </div>
        )
    }
    const ProductImage = () => {
        return (
            <div className="flex-1 w-full">
                <img src="/assets/item-product-coffee_cup.png"
                    alt="Product Coffee Cup" />
            </div>
        )
    }
    return (
        <div className={clsx(
            "rounded-2xl border-2 border-default-200",
            "w-fit min-w-80 aspect-[7/10]",
            "flex flex-col gap-2 p-4 items-center justify-center"
        )}>
            <Header />
            <ProductImage />
            <Body />
            <Footer />
        </div>
    )
}