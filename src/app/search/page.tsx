"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { cityCoordinates } from "@/lib/mockData";
import { Venue } from "@/lib/types";
import { fetchVenues } from "@/lib/api";
import VenueCard from "@/components/results/VenueCard";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Sliders, MapIcon, List, Loader2, X } from "lucide-react";
import Link from "next/link";

// Dynamic import for map to avoid SSR issues with Leaflet
const MapComponent = dynamic(
    () => import("@/components/map/MapComponent"),
    { ssr: false, loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl"></div> }
);

function SearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const country = searchParams.get("country");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const typeParam = searchParams.get("type");

    const [radiusKm, setRadiusKm] = useState(5);
    const [selectedType, setSelectedType] = useState<string>(typeParam || "all");
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
    const [viewMode, setViewMode] = useState<"split" | "map" | "list">("split");

    // State for venues and loading
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Filter venues based on selected type
    const filteredVenues = useMemo(() => {
        if (selectedType === "all") return venues;
        return venues.filter(venue => venue.type === selectedType);
    }, [venues, selectedType]);

    // Map center state
    const [mapCenter, setMapCenter] = useState<[number, number]>([17.385, 78.4867]); // Default Hyderabad

    // Fetch coordinates and venues when location changes
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setSelectedVenue(null);
            let lat = 17.385;
            let lng = 78.4867;
            let coordsFound = false;

            // 1. Determine Coordinates
            // Try mock data first
            if (city && cityCoordinates[city]) {
                lat = cityCoordinates[city].lat;
                lng = cityCoordinates[city].lng;
                setMapCenter([lat, lng]);
                coordsFound = true;
            }
            // Fetch from Nominatim if not in mock
            else if (city) {
                try {
                    const query = `${city}, ${state || ''}, ${country || ''}`.replace(/, ,/g, ',');
                    console.log("Fetching coordinates for:", query);

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
                    );
                    const data = await response.json();

                    if (data && data.length > 0) {
                        lat = parseFloat(data[0].lat);
                        lng = parseFloat(data[0].lon);
                        console.log("Found coordinates:", lat, lng);
                        setMapCenter([lat, lng]);
                        coordsFound = true;
                    }
                } catch (error) {
                    console.error("Error fetching coordinates:", error);
                }
            }

            // 2. Fetch Venues from API based on coordinates
            if (city || coordsFound) {
                try {
                    console.log(`Fetching venues for ${lat}, ${lng} radius ${radiusKm}km via Google Places...`);

                    const { fetchVenuesGoogle } = await import("@/lib/api");
                    const googleVenues = await fetchVenuesGoogle(lat, lng, radiusKm);

                    // Final deduplication by normalized name (just in case API returns overlaps)
                    const uniqueVenues: Venue[] = [];
                    const seenNames = new Set<string>();

                    for (const venue of googleVenues) {
                        const normalizedName = venue.name.toLowerCase().replace(/[^a-z0-9]/g, "");
                        if (!seenNames.has(normalizedName)) {
                            seenNames.add(normalizedName);
                            uniqueVenues.push(venue);
                        }
                    }

                    setVenues(uniqueVenues);
                } catch (error) {
                    console.error("Error fetching venues:", error);
                    setVenues([]);
                } finally {
                    setIsLoading(false);
                }

            } else {
                setIsLoading(false);
                setVenues([]);
            }
        };

        loadData();
    }, [city, state, country, radiusKm]);

    const updateDate = (newDate: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newDate) {
            params.set("date", newDate);
        } else {
            params.delete("date");
        }
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    Venues in {city || "Selected Area"}, {state}
                                </h1>
                                <p className="text-sm text-gray-400">
                                    {isLoading ? "Searching..." : `${filteredVenues.length} venues found`}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons, Date Picker & View Mode Toggle */}
                        <div className="flex items-center gap-3">
                            <Link href="/add-venue">
                                <Button variant="outline" size="sm" className="hidden sm:flex border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                                    List Your Venue
                                </Button>
                            </Link>

                            {/* View Mode Toggle - Visible on all screens */}
                            <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
                                <button
                                    onClick={() => setViewMode("split")}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${viewMode === "split"
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-white"
                                        } hidden md:block`} // Hide Split on mobile, show Map/List
                                >
                                    Split
                                </button>
                                <button
                                    onClick={() => setViewMode("map")}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${viewMode === "map"
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                    title="Map View"
                                >
                                    <MapIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${viewMode === "list"
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                    title="List View"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 flex flex-wrap items-center gap-6">
                        {/* Radius Filter */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Sliders className="w-4 h-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-300">
                                    Radius: {radiusKm} km
                                </label>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={radiusKm}
                                onChange={(e) => setRadiusKm(Number(e.target.value))}
                                className="w-48 accent-blue-600 bg-gray-700 h-1 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Venue Type Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-300">Type:</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-3 py-1.5 rounded-lg border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                            >
                                <option value="all">All Types</option>
                                <option value="party_hall">Party / Function Halls</option>
                                <option value="resort">Resorts</option>
                                <option value="hotel">Hotels</option>
                            </select>
                        </div>

                        {/* Date Picker - Availability Check */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-300">Event Date:</label>
                                <input
                                    type="date"
                                    value={searchParams.get("date") || ""}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => updateDate(e.target.value)}
                                    className="px-3 py-1.5 rounded-lg border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500 [color-scheme:dark]"
                                />
                            </div>

                            {searchParams.get("date") && (
                                <div className="flex items-center gap-3 text-xs font-medium text-gray-300 bg-gray-800 px-2 py-1.5 rounded-lg border border-gray-700 shadow-sm animate-in fade-in slide-in-from-left-4 duration-300">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                                        <span>Available</span>
                                    </div>
                                    <div className="w-px h-3 bg-gray-600"></div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
                                        <span>Booked</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)]">
                    {/* Map Section */}
                    {(viewMode === "split" || viewMode === "map") && (
                        <div className={`${viewMode === "split" ? "lg:w-1/2" : "w-full"} h-full flex flex-col`}>
                            <div className="bg-gray-900 rounded-xl shadow-lg p-2 flex-grow relative min-h-[400px] border border-gray-800">
                                <MapComponent
                                    center={mapCenter}
                                    venues={filteredVenues}
                                    radiusKm={radiusKm}
                                    onVenueClick={setSelectedVenue}
                                    selectedVenue={selectedVenue}
                                    date={searchParams.get("date") || undefined}
                                />
                                {selectedVenue && (
                                    <button
                                        onClick={() => setSelectedVenue(null)}
                                        className="absolute top-4 right-4 z-[1000] bg-gray-800 text-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-700 flex items-center gap-2 border border-gray-600 transition-all font-medium text-sm"
                                    >
                                        <X className="w-4 h-4" />
                                        Show All Venues
                                    </button>
                                )}
                                {isLoading && (
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] rounded-xl">
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    </div>
                                )}
                            </div>

                            {/* Venue Type Breakdown - visible only when All Types selected */}
                            {selectedType === "all" && !isLoading && filteredVenues.length > 0 && (
                                <div className="mt-4 bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-4 shrink-0">
                                    <h3 className="text-sm font-semibold text-gray-300 mb-3">Venue Summary</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-blue-900/20 rounded-lg p-3 text-center border border-blue-500/20">
                                            <div className="text-2xl font-bold text-blue-400">
                                                {filteredVenues.filter(v => v.type === 'party_hall' || v.type === 'function_hall').length}
                                            </div>
                                            <div className="text-xs font-medium text-blue-300 mt-1">Party Halls</div>
                                        </div>
                                        <div className="bg-indigo-900/20 rounded-lg p-3 text-center border border-indigo-500/20">
                                            <div className="text-2xl font-bold text-indigo-400">
                                                {filteredVenues.filter(v => v.type === 'hotel').length}
                                            </div>
                                            <div className="text-xs font-medium text-indigo-300 mt-1">Hotels</div>
                                        </div>
                                        <div className="bg-purple-900/20 rounded-lg p-3 text-center border border-purple-500/20">
                                            <div className="text-2xl font-bold text-purple-400">
                                                {filteredVenues.filter(v => v.type === 'resort').length}
                                            </div>
                                            <div className="text-xs font-medium text-purple-300 mt-1">Resorts</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Venues List Section */}
                    {(viewMode === "split" || viewMode === "list") && (
                        <div className={`${viewMode === "split" ? "lg:w-1/2" : "w-full"} overflow-y-auto custom-scrollbar`}>
                            <div className="space-y-4">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                                        <p className="text-gray-400">Finding venues near you...</p>
                                    </div>
                                ) : filteredVenues.length === 0 ? (
                                    <div className="bg-gray-900 rounded-xl shadow-lg p-12 text-center border border-gray-800">
                                        <p className="text-gray-300 text-lg">No venues found matching your criteria.</p>
                                        <p className="text-gray-500 text-sm mt-2">Try adjusting filters or increasing the radius.</p>
                                    </div>
                                ) : (
                                    filteredVenues.map((venue) => (
                                        <VenueCard
                                            key={venue.id}
                                            venue={venue}
                                            onClick={() => setSelectedVenue(venue)}
                                            date={searchParams.get("date") || undefined}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-blue-500 text-xl animate-pulse">Loading...</div>
        </div>}>
            <SearchResults />
        </Suspense>
    );
}
