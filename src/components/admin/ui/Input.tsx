import React from "react";

type InputProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> & {
  label?: string;
  as?: "input" | "select" | "textarea";
};

export const Input = React.forwardRef<any, InputProps>(
  ({ label, as = "input", className = "", children, ...props }, ref) => {
    const baseClasses =
      "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-[#111] focus:outline-none focus:ring-1 focus:ring-[#111] transition-shadow duration-200 disabled:bg-gray-50 disabled:text-gray-500";

    return (
      <div className="space-y-1 w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {as === "select" ? (
          <select
            ref={ref}
            className={`${baseClasses} ${className}`}
            {...(props as any)}>
            {children}
          </select>
        ) : as === "textarea" ? (
          <textarea
            ref={ref}
            className={`${baseClasses} ${className}`}
            {...(props as any)}
          />
        ) : (
          <input
            ref={ref}
            className={`${baseClasses} ${className}`}
            {...(props as any)}
          />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
