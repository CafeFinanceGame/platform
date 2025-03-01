interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function PageContainer({ children, ...props }: PageContainerProps) {
    return (
        <div className="p-4 w-full h-full" {...props}>
            {children}
        </div>
    );
}