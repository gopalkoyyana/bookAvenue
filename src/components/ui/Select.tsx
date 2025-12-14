import React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, ...props }, ref) => {
        return (
            <select
                className={cn(
                    "flex h-11 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm",
                    "transition-all duration-200",
                    "focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "cursor-pointer",
                    className
                )}
                ref={ref}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = "Select";
