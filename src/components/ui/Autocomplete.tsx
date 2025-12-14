"use client";

import React, { useState, useRef, useEffect } from "react";
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
}: AutocompleteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter options based on search term
    // Only filter if search term has 3+ characters, otherwise show limited results
    const safeOptions = Array.isArray(options) ? options : [];
    const filteredOptions = searchTerm.length >= 3
        ? safeOptions.filter((option) =>
            option && option.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : safeOptions.slice(0, 20); // Show only first 20 options if no search term

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
        onChange(option);
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
                        "flex h-9 w-full items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm",
                        "transition-all duration-200",
                        "focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "hover:border-gray-300",
                        isOpen && "border-purple-500 ring-2 ring-purple-200",
                        className
                    )}
                >
                    <span className={cn("truncate", !value && "text-gray-400")}>
                        {displayValue || placeholder}
                    </span>
                    <ChevronDown
                        className={cn(
                            "ml-2 h-4 w-4 text-gray-500 transition-transform duration-200",
                            isOpen && "rotate-180"
                        )}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-[9999] mt-2 w-full rounded-lg border-2 border-purple-200 bg-white shadow-xl">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type 3+ characters to search..."
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="max-h-60 overflow-y-auto p-1">
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
                                    {searchTerm.length < 3 && options.length > 20 && (
                                        <div className="px-4 py-2 text-xs text-gray-500 bg-purple-50 rounded mb-1">
                                            Showing first 20 options. Type 3+ characters to search all {options.length} options.
                                        </div>
                                    )}
                                    {filteredOptions.map((option, index) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleSelect(option)}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-2.5 text-sm text-left rounded-md transition-colors",
                                                "hover:bg-purple-50",
                                                highlightedIndex === index && "bg-purple-50",
                                                value === option && "bg-purple-100 font-medium"
                                            )}
                                        >
                                            <span className="truncate">{option}</span>
                                            {value === option && (
                                                <Check className="h-4 w-4 text-purple-600 flex-shrink-0 ml-2" />
                                            )}
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
