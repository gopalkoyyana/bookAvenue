"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Locate } from "lucide-react";

interface LocationPickerProps {
    latitude: number;
    longitude: number;
    onLocationSelect: (lat: number, lng: number) => void;
}

// Component to handle map clicks
function LocationMarker({ position, onLocationSelect }: { position: { lat: number, lng: number }, onLocationSelect: (lat: number, lng: number) => void }) {
    const map = useMap();

    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.flyTo([position.lat, position.lng], map.getZoom());
    }, [position, map]);

    const customIcon = new Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
        <path fill="#2563eb" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    return position ? (
        <Marker position={position} icon={customIcon} />
    ) : null;
}

export default function LocationPicker({ latitude, longitude, onLocationSelect }: LocationPickerProps) {
    const defaultCenter = { lat: 17.385, lng: 78.4867 }; // Default to Hyderabad
    const position = (latitude && longitude) ? { lat: latitude, lng: longitude } : defaultCenter;

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    onLocationSelect(lat, lng);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    alert("Could not get your current location. Please check your browser permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={position}
                zoom={13}
                className="h-[300px] w-full rounded-xl z-0"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} onLocationSelect={onLocationSelect} />
            </MapContainer>

            <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute top-4 right-4 z-[1000] bg-white text-blue-600 border-blue-200 hover:bg-blue-50 shadow-md"
                onClick={handleCurrentLocation}
            >
                <Locate className="w-4 h-4 mr-2" />
                Use My Location
            </Button>
        </div>
    );
}
