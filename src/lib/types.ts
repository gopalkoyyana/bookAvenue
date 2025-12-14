export interface Venue {
    id: string;
    name: string;
    type: "party_hall" | "resort" | "hotel" | "function_hall";
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    capacity: {
        min: number;
        max: number;
    };
    priceRange: {
        min: number;
        max: number;
        currency: string;
    };
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    images: string[];
    amenities: string[];
    rating?: number;
    reviews?: number;
}

export interface SearchFilters {
    country: string;
    state: string;
    city: string;
    latitude?: number;
    longitude?: number;
    radiusKm: number;
    minCapacity?: number;
    maxPrice?: number;
    venueType?: string;
}
