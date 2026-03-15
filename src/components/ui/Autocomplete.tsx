"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search } from "lucide-react";

interface AutocompleteProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    className?: string;       // Custom class for the button/input container
    labelClassName?: string;  // Custom class for the label
    darkTheme?: boolean;      // New prop for dark mode
}

export default function Autocomplete({
    options,
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
    label,
    className,
    labelClassName,
    darkTheme = false,
}: AutocompleteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Unified options including custom typed value
    const filteredOptions = useMemo(() => {
        const safeOptions = Array.isArray(options) ? options : [];
        let results = searchTerm.length >= 3
            ? safeOptions.filter((option) =>
                option && option.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : safeOptions.slice(0, 20);

        // If user typed something that isn't in results, offer to use it
        const isMatch = safeOptions.some(opt => opt.toLowerCase() === searchTerm.toLowerCase());
        if (searchTerm.length >= 2 && !isMatch) {
            results = [`USE_CUSTOM:${searchTerm}`, ...results];
        }
        return results;
    }, [searchTerm, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    handleSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                setSearchTerm("");
                break;
        }
    };

    const handleSelect = (option: string) => {
        const finalValue = option.startsWith("USE_CUSTOM:") 
            ? option.replace("USE_CUSTOM:", "") 
            : option;
        onChange(finalValue);
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setHighlightedIndex(0);
        if (!isOpen) setIsOpen(true);
    };

    const displayValue = value || "";

    return (
        <div ref={containerRef} className="relative w-full">
            {label && (
                <label className={cn("block text-sm font-medium mb-1", labelClassName || "text-gray-700")}>
                    {label}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => {
                        if (!disabled) {
                            setIsOpen(!isOpen);
                            if (!isOpen) {
                                setTimeout(() => inputRef.current?.focus(), 0);
                            }
                        }
                    }}
                    disabled={disabled}
                    className={cn(
                        "flex h-9 w-full items-center justify-between rounded-lg border-2 px-3 py-2 text-sm",
                        "transition-all duration-200",
                        // Dynamic styles based on theme
                        darkTheme
                            ? "bg-transparent border-none text-white focus:ring-0"
                            : "border-gray-200 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-200 hover:border-gray-300",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                >
                    <span className={cn("truncate", !value && (darkTheme ? "text-gray-400" : "text-gray-400"))}>
                        {displayValue || placeholder}
                    </span>
                    <ChevronDown
                        className={cn(
                            "ml-2 h-4 w-4 transition-transform duration-200",
                            darkTheme ? "text-gray-400" : "text-gray-500",
                            isOpen && "rotate-180"
                        )}
                    />
                </button>

                {isOpen && (
                    <div className={cn(
                        "absolute z-[9999] mt-2 w-full rounded-lg border shadow-xl",
                        darkTheme
                            ? "bg-[#0b1a2c] border-white/10 text-white"
                            : "bg-white border-purple-200"
                    )}>
                        {/* Search Input */}
                        <div className={cn("p-2 border-b", darkTheme ? "border-white/10" : "border-gray-200")}>
                            <div className="relative">
                                <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4", darkTheme ? "text-gray-400" : "text-gray-400")} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type 3+ characters to search..."
                                    className={cn(
                                        "w-full pl-10 pr-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2",
                                        darkTheme
                                            ? "bg-white/5 border border-white/10 text-white focus:border-brand-blue focus:ring-brand-blue/30 placeholder:text-gray-500"
                                            : "border border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                                    )}
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                            {searchTerm.length > 0 && searchTerm.length < 3 ? (
                                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                    Type at least 3 characters to search
                                </div>
                            ) : filteredOptions.length === 0 ? (
                                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                    No results found
                                </div>
                            ) : (
                                <>
                                    {filteredOptions.map((option, index) => {
                                        const isCustom = option.startsWith("USE_CUSTOM:");
                                        const label = isCustom ? option.replace("USE_CUSTOM:", "") : option;

                                        return (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => handleSelect(option)}
                                                onMouseEnter={() => setHighlightedIndex(index)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-2.5 text-sm text-left rounded-md transition-colors",
                                                    isCustom && "mb-1 border-b border-white/5 pb-3",
                                                    darkTheme
                                                        ? (highlightedIndex === index ? "bg-brand-blue/20 text-white" : "text-gray-300 hover:bg-white/5")
                                                        : (highlightedIndex === index ? "bg-purple-50" : "text-gray-900 hover:bg-purple-50"),
                                                    value === label && (darkTheme ? "bg-brand-blue text-white font-medium" : "bg-purple-100 font-medium")
                                                )}
                                            >
                                                <div className="flex flex-col">
                                                    <span className={cn("truncate", isCustom && "font-bold text-blue-400")}>
                                                        {isCustom ? `Use "${label}"` : label}
                                                    </span>
                                                    {isCustom && <span className="text-[10px] opacity-60">Search for this custom location</span>}
                                                </div>
                                                {(value === label || isCustom) && (
                                                    isCustom ? <Search className="h-3 w-3 opacity-50" /> : <Check className={cn("h-4 w-4 flex-shrink-0 ml-2", darkTheme ? "text-white" : "text-purple-600")} />
                                                )}
                                            </button>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
