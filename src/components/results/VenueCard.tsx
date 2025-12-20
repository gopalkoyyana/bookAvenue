"use client";

import { Venue } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { MapPin, Users, Phone, Mail, Star, Building2, Hotel, PartyPopper, Home, Plus } from "lucide-react";
import Image from "next/image";
import { checkAvailability } from "@/lib/mockData";
import { useState } from "react";
import dynamic from "next/dynamic";

const MediaGalleryModal = dynamic(() => import("@/components/ui/MediaGalleryModal"), { ssr: false });

interface VenueCardProps {
    venue: Venue;
    onClick?: () => void;
    date?: string;
}

const typeIcons = {
    party_hall: PartyPopper,
    hotel: Hotel,
    resort: Home,
    function_hall: Building2,
};

const typeLabels = {
    party_hall: "Party / Function Hall",
    hotel: "Hotel",
    resort: "Resort",
    function_hall: "Party / Function Hall",
};

export default function VenueCard({ venue, onClick, date }: VenueCardProps) {
    const [showGallery, setShowGallery] = useState(false);
    const TypeIcon = typeIcons[venue.type];
    const isAvailable = date ? checkAvailability(venue.id, date) : undefined;

    const handleGalleryOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowGallery(true);
    };

    return (
        <>
            <Card
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gray-900 border-gray-800"
                onClick={onClick}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full md:w-64 h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group">
                        {venue.images && venue.images.length > 0 ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={venue.images[0]}
                                    alt={venue.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* Overlay gradient for text visibility if needed */}
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-700">
                                <TypeIcon className="w-16 h-16" />
                            </div>
                        )}

                        {/* Type Badge */}
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-blue-300 flex items-center gap-1 border border-white/10">
                            <TypeIcon className="w-3 h-3" />
                            {typeLabels[venue.type]}
                        </div>

                        {/* Rating Badge */}
                        {venue.rating && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-white/10 text-white">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{venue.rating}</span>
                            </div>
                        )}

                        {/* Gallery Trigger Button */}
                        <div
                            onClick={handleGalleryOpen}
                            className="absolute bottom-3 right-3 bg-black/60 hover:bg-blue-600 hover:text-white backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center border border-white/20 transition-colors z-10 shadow-lg group-hover:scale-110"
                            title="View Photos & Video"
                        >
                            <Plus className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 p-5 relative">
                        <div className="mb-3">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="text-xl font-bold text-white pr-6">{venue.name}</h3>
                                {date && (
                                    <div
                                        className={`w-3 h-3 rounded-full shadow-sm flex-shrink-0 mt-2 ${isAvailable ? "bg-green-500 animate-pulse shadow-green-500/50" : "bg-red-500 shadow-red-500/50"}`}
                                        title={isAvailable ? "Available on selected date" : "Booked on selected date"}
                                    />
                                )}
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                                <span>{venue.address}, {venue.city}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {/* Capacity */}
                            <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                                    <Users className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Capacity</p>
                                    <p className="font-semibold text-gray-200">
                                        {venue.capacity.min === 0 && venue.capacity.max === 0
                                            ? "Not available"
                                            : `${venue.capacity.min} - ${venue.capacity.max}`}
                                    </p>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                                    <span className="text-blue-400 font-bold">₹</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Price Range</p>
                                    <p className="font-semibold text-gray-200">
                                        {venue.priceRange.min === 0 && venue.priceRange.max === 0
                                            ? "Not available"
                                            : `${venue.priceRange.currency} ${(venue.priceRange.min / 1000).toFixed(0)}K - ${(venue.priceRange.max / 1000).toFixed(0)}K`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-3 text-sm mb-4">
                            {venue.contact.phone && venue.contact.phone !== "Not available" && (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                    <span>{venue.contact.phone}</span>
                                </div>
                            )}
                            {venue.contact.email && venue.contact.email !== "Not available" && (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    <span className="truncate max-w-[200px]">{venue.contact.email}</span>
                                </div>
                            )}
                            {venue.contact.website && (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <span className="text-blue-400 text-xs border border-blue-500/30 px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-500/10">Website</span>
                                </div>
                            )}
                        </div>

                        {/* Amenities */}
                        {venue.amenities && venue.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {venue.amenities.slice(0, 4).map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-800 text-gray-300 border border-gray-700 text-xs rounded-md font-medium"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                                {venue.amenities.length > 4 && (
                                    <span className="px-2 py-1 bg-gray-800 text-gray-500 border border-gray-700 text-xs rounded-md font-medium">
                                        +{venue.amenities.length - 4} more
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            <MediaGalleryModal
                isOpen={showGallery}
                onClose={() => setShowGallery(false)}
                images={venue.images}
                video={venue.video}
                title={venue.name}
            />
        </>
    );
}
