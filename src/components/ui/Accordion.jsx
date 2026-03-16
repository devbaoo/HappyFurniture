import { useState } from "react";

// Accordion — collapsible section with title, arrow icon
const Accordion = ({ title, children, defaultOpen = false, className = "" }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className={`border-b border-border ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={open}
            >
                <span className="text-sm font-medium text-primary tracking-wide">
                    {title}
                </span>
                <svg
                    className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? "rotate-90" : ""
                        }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] pb-4" : "max-h-0"
                    }`}
            >
                <div className="text-sm text-secondary leading-relaxed">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
