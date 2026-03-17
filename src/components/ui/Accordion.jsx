import { useState } from "react";

// Accordion — collapsible section with title, arrow icon
const Accordion = ({ title, children, defaultOpen = false, className = "" }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className={`border-b border-gray-200 ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-5 text-left hover:bg-gray-50/50 transition-colors"
                aria-expanded={open}
            >
                <span className="text-sm font-medium text-black">
                    {title}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-90" : ""
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
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[800px] pb-4" : "max-h-0"
                    }`}
            >
                <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
