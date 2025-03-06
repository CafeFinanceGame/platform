export default async function Layout({ children }: {
    children: any;
}) {
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
}
