"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Autocomplete from "@/components/ui/Autocomplete";
import { countries, statesByCountry, citiesByState } from "@/lib/mockData";
import { MapPin, Search } from "lucide-react";

export default function SearchForm() {
    const router = useRouter();
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("all");

    const handleSearch = () => {
        // Allow search with any combination of country, state, or city
        // At least one field must be filled
        if (country || state || city || type !== "all") {
            const params = new URLSearchParams();
            if (country) params.append("country", country);
            if (state) params.append("state", state);
            if (city) params.append("city", city);
            if (type !== "all") params.append("type", type);
            router.push(`/search?${params.toString()}`);
        }
    };

    // Get all available states from all countries
    const allStates = useMemo(() => {
        const states: string[] = [];
        Object.values(statesByCountry).forEach(stateList => {
            states.push(...stateList);
        });
        return Array.from(new Set(states)).sort();
    }, []);

    // Get all available cities from all states
    const allCities = useMemo(() => {
        const cities: string[] = [];
        Object.values(citiesByState).forEach(cityList => {
            cities.push(...cityList);
        });
        return Array.from(new Set(cities)).sort();
    }, []);

    // Get available states - either from selected country or all states
    const availableStates = useMemo(() => {
        if (country && statesByCountry[country]) {
            return statesByCountry[country];
        }
        return allStates;
    }, [country, allStates]);

    // Get available cities - based on country and/or state selection
    const availableCities = useMemo(() => {
        console.log('Computing availableCities - country:', country, 'state:', state);

        // If state is selected, show only cities from that state
        if (state && citiesByState[state]) {
            const stateCities = citiesByState[state];
            console.log(`State "${state}" selected - showing ${stateCities.length} cities:`, stateCities);
            return stateCities;
        }

        // If country is selected but no state, show all cities from that country
        if (country && statesByCountry[country]) {
            const countryCities: string[] = [];
            statesByCountry[country].forEach((stateName) => {
                if (citiesByState[stateName]) {
                    countryCities.push(...citiesByState[stateName]);
                }
            });
            const uniqueCities = Array.from(new Set(countryCities)).sort();
            console.log(`Country "${country}" selected - showing ${uniqueCities.length} cities`);
            return uniqueCities;
        }

        // If neither country nor state selected, show all cities
        console.log(`No filters - showing all ${allCities.length} cities`);
        return allCities;
    }, [country, state, allCities]);

    return (
        <div className="w-full max-w-5xl mx-auto relative z-10">
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/50 overflow-visible">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        Find Your Perfect Venue for Every Occasion
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 overflow-visible">
                    <Autocomplete
                        label="Country (Optional)"
                        labelClassName="text-gray-900 font-semibold text-sm"
                        className="bg-white border-gray-200 text-gray-900"
                        options={countries}
                        value={country}
                        onChange={(value) => {
                            setCountry(value);
                        }}
                        placeholder="Select country..."
                    />

                    <Autocomplete
                        label="State (Optional)"
                        labelClassName="text-gray-900 font-semibold text-sm"
                        className="bg-white border-gray-200 text-gray-900"
                        options={availableStates}
                        value={state}
                        onChange={(value) => {
                            setState(value);
                        }}
                        placeholder="Select state..."
                    />

                    <Autocomplete
                        label="City / Town"
                        labelClassName="text-gray-900 font-semibold text-sm"
                        className="bg-white border-gray-200 text-gray-900"
                        options={availableCities}
                        value={city}
                        onChange={setCity}
                        placeholder="Select city..."
                    />

                    <div className="flex items-end">
                        <Button
                            onClick={handleSearch}
                            disabled={!city}
                            className="w-full h-9 bg-orange-700/80 hover:bg-orange-800 text-white font-medium shadow-md"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
