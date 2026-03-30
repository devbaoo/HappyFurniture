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
                className={`font-heading uppercase text-2xl font-normal tracking-[0.08em] leading-[1.08] ${light ? "text-white" : "text-primary"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-2 text-sm font-normal leading-relaxed ${light ? "text-white/70" : "text-muted"
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
