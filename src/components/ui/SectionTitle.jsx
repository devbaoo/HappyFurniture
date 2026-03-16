// SectionTitle — uppercase tracked heading with optional subtitle
const SectionTitle = ({
    title,
    subtitle,
    align = "center",
    light = false,
    className = "",
}) => {
    const alignClass =
        align === "center"
            ? "text-center"
            : align === "right"
                ? "text-right"
                : "text-left";

    return (
        <div className={`${alignClass} ${className}`}>
            <h2
                className={`font-heading uppercase tracking-widest text-2xl font-light ${light ? "text-white" : "text-primary"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-2 text-sm font-light ${light ? "text-white/70" : "text-muted"
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
