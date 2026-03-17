// Container — max-w-[1320px] centered layout wrapper
const Container = ({ children, className = "" }) => {
    return (
        <div className={`mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full ${className}`}>
            {children}
        </div>
    );
};

export default Container;
