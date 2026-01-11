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
        <div className="w-full relative z-10">
            <div className="bg-gray-900 border border-blue-900/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0)] p-2 md:p-3 ring-1 ring-blue-500/20">
                <div className="flex flex-col md:flex-row items-stretch md:items-center bg-gray-950 rounded-2xl border border-blue-900/30 divide-y md:divide-y-0 md:divide-x divide-blue-900/30">

                    {/* Country Input */}
                    <div className="relative flex-1 p-2 hover:bg-white/5 transition-colors rounded-xl md:rounded-l-xl md:rounded-r-none group">
                        <Autocomplete
                            label="Country"
                            labelClassName="text-blue-200 font-bold text-xs uppercase tracking-wider mb-1 block pl-1 group-hover:text-white transition-colors"
                            className="bg-transparent border-none text-white focus:ring-0 px-1 h-8 font-bold text-lg placeholder:text-blue-300/50 w-full"
                            options={countries}
                            value={country}
                            onChange={(value) => {
                                setCountry(value);
                            }}
                            placeholder="Select Country"
                            darkTheme={true}
                        />
                    </div>

                    {/* State Input */}
                    <div className="relative flex-1 p-2 hover:bg-white/5 transition-colors group">
                        <Autocomplete
                            label="State"
                            labelClassName="text-blue-200 font-bold text-xs uppercase tracking-wider mb-1 block pl-1 group-hover:text-white transition-colors"
                            className="bg-transparent border-none text-white focus:ring-0 px-1 h-8 font-bold text-lg placeholder:text-blue-300/50 w-full"
                            options={availableStates}
                            value={state}
                            onChange={(value) => {
                                setState(value);
                            }}
                            placeholder="Select State"
                            darkTheme={true}
                        />
                    </div>

                    {/* City Input */}
                    <div className="relative flex-1 p-2 hover:bg-white/5 transition-colors group">
                        <Autocomplete
                            label="City"
                            labelClassName="text-blue-200 font-bold text-xs uppercase tracking-wider mb-1 block pl-1 group-hover:text-white transition-colors"
                            className="bg-transparent border-none text-white focus:ring-0 px-1 h-8 font-bold text-lg placeholder:text-blue-300/50 w-full"
                            options={availableCities}
                            value={city}
                            onChange={setCity}
                            placeholder="Select City"
                            darkTheme={true}
                        />
                    </div>

                    <div className="p-2 md:pl-2">
                        <Button
                            onClick={handleSearch}
                            disabled={!country && !state && !city}
                            className="w-full md:w-auto h-14 md:h-14 px-8 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-lg shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.02] transition-all flex items-center justify-center min-w-[140px] border border-blue-400/20"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
