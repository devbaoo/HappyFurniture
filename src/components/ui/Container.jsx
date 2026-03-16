// Container — max-w-[1320px] centered layout wrapper
const Container = ({ children, className = "" }) => {
    return (
        <div className={`mx-auto max-w-[1320px] px-6 w-full ${className}`}>
            {children}
        </div>
    );
};

export default Container;
