import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200",
                    "hover:shadow-md",
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = "Card";
