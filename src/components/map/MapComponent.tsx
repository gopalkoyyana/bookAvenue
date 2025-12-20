"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip, useMap } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Venue } from "@/lib/types";
import { Building2, Hotel, PartyPopper } from "lucide-react";
import { useEffect } from "react";

import { checkAvailability } from "@/lib/mockData";

interface MapComponentProps {
    center: LatLngExpression;
    venues: Venue[];
    radiusKm: number;
    onVenueClick?: (venue: Venue) => void;
    selectedVenue?: Venue | null;
    date?: string;
}

// Component to handle map center updates and venue selection
function MapUpdater({ center, selectedVenue }: { center: LatLngExpression, selectedVenue?: Venue | null }) {
    const map = useMap();

    // Unified effect to handle map view updates
    useEffect(() => {
        if (selectedVenue) {
            map.flyTo([selectedVenue.latitude, selectedVenue.longitude], 16, {
                duration: 1.5
            });
        } else {
            map.flyTo(center, 12, {
                duration: 1.5
            });
        }
    }, [center, selectedVenue, map]);

    return null;
}

// Fix for default marker icon in Next.js
const createCustomIcon = (type: Venue["type"], status?: 'available' | 'booked') => {
    let color;

    if (status === 'available') {
        color = "#22c55e"; // Green-500
    } else if (status === 'booked') {
        color = "#ef4444"; // Red-500
    } else {
        const colors = {
            party_hall: "#3b82f6", // Blue-500
            hotel: "#6366f1",      // Indigo-500
            resort: "#0ea5e9",     // Sky-500
            function_hall: "#2563eb", // Blue-600
        };
        color = colors[type] || "#3b82f6";
    }

    return new Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

export default function MapComponent({ center, venues, radiusKm, onVenueClick, selectedVenue, date }: MapComponentProps) {
    return (
        <MapContainer
            center={center}
            zoom={12}
            className="h-full w-full rounded-xl"
            scrollWheelZoom={true}
        >
            <MapUpdater center={center} selectedVenue={selectedVenue} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Radius circle - only show when no venue is selected */}
            {!selectedVenue && (
                <Circle
                    center={center}
                    radius={radiusKm * 1000}
                    pathOptions={{
                        fillColor: "#3b82f6",
                        fillOpacity: 0.1,
                        color: "#3b82f6",
                        weight: 2,
                    }}
                />
            )}

            {/* Venue markers */}
            {venues
                .filter(venue => !selectedVenue || venue.id === selectedVenue.id)
                .map((venue) => {
                    const isAvailable = date ? checkAvailability(venue.id, date) : undefined;
                    const status = date ? (isAvailable ? 'available' : 'booked') : undefined;

                    return (
                        <Marker
                            key={venue.id}
                            position={[venue.latitude, venue.longitude]}
                            icon={createCustomIcon(venue.type, status)}
                            eventHandlers={{
                                click: () => onVenueClick?.(venue),
                            }}
                        >
                            {/* Permanent tooltip showing venue name when selected */}
                            {selectedVenue && selectedVenue.id === venue.id ? (
                                <Tooltip permanent direction="right" offset={[15, 0]}>
                                    <div className="font-semibold text-sm">
                                        {venue.name}
                                        {date && (
                                            <span className={`block text-xs ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                                {isAvailable ? 'Available' : 'Booked'}
                                            </span>
                                        )}
                                    </div>
                                </Tooltip>
                            ) : (
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-semibold text-sm mb-1">{venue.name}</h3>
                                        <p className="text-xs text-gray-600 mb-1">{venue.address}</p>
                                        <p className="text-xs font-medium text-blue-600 mb-1">
                                            {venue.priceRange.currency} {venue.priceRange.min.toLocaleString()} - {venue.priceRange.max.toLocaleString()}
                                        </p>
                                        {date && (
                                            <div className={`text-xs font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                                {isAvailable ? 'Available' : 'Booked'} on {date}
                                            </div>
                                        )}
                                    </div>
                                </Popup>
                            )}
                        </Marker>
                    );
                })}
        </MapContainer>
    );
}
