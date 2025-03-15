import { TbBucket } from "react-icons/tb";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    emptyText?: string;
    icon?: React.ReactNode;
}
export const Empty: React.FC<Props> = (props) => {
    const { emptyText, icon } = props;

    return <div className="w-full h-full text-foreground-500 flex flex-col items-center justify-center">
        {icon ? icon : <TbBucket size={20} />}
        {emptyText?.length ? <p>{emptyText}</p> : <p>No data available</p>}
    </div>
};