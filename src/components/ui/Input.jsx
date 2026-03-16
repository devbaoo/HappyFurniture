// Input — labeled form input
const Input = ({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    className = "",
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-medium tracking-wide text-primary uppercase"
                >
                    {label}
                    {required && <span className="text-muted ml-0.5">(*)</span>}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="border-b border-border bg-transparent py-2 text-sm text-primary placeholder:text-muted/60 focus:border-primary transition-colors duration-200"
            />
        </div>
    );
};

export default Input;
