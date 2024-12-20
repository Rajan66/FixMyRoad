interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="max-w-[1920px]  px-4 md:px-10 xl:px-28 2xl:px-52 h-full">
            <div className="mx-[20px] md:mx-[40px] 2xl:mx-[80px]">
                {children}
            </div>
        </div>
    );
}