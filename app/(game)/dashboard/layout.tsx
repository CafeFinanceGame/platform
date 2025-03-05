export default async function Layout({ children }: {
    children: any;
}) {
    return (
        <div className="relative w-full h-full">
            <img src="/assets/page-cover.png" alt="Page Cover" className="absolute object-cover w-full h-full" />
            {children}
        </div>
    );
}
