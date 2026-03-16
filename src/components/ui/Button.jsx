// Button — multiple variants following design system
const Button = ({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    onClick,
    className = "",
    disabled = false,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center font-medium tracking-widest uppercase text-xs transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-accent border border-primary",
        secondary:
            "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
        white:
            "bg-white text-primary hover:bg-primary hover:text-white border border-white",
        ghost: "bg-transparent text-primary hover:text-muted border-none",
        dark: "bg-dark text-white border border-dark hover:bg-accent",
    };

    const sizes = {
        sm: "px-5 py-2 text-[10px]",
        md: "px-8 py-3",
        lg: "px-10 py-4",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
