import { Venue } from "./types";

// Helper to calculate distance between two points
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat1)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

// Multiple Overpass API endpoints for fallback
const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter'
];

// Helper function to fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeout = 15000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout - API took too long to respond');
        }
        throw error;
    }
}

export async function fetchVenues(lat: number, lng: number, radiusKm: number): Promise<Venue[]> {
    // Treat 0 km as 500 meters (0.5 km) for very local searches
    const searchRadius = radiusKm === 0 ? 0.5 : radiusKm;

    // Validate inputs
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        console.error("Invalid coordinates for venue search:", { lat, lng });
        return [];
    }

    // Simplified and optimized Overpass API query
    // Focusing on most common venue types to reduce query complexity
    // Focused tag-based query only — Google Places handles name-based search
    const query = `
    [out:json][timeout:30];
    (
      node["amenity"~"events_venue|community_centre|conference_centre|townhall|hall|marriage_hall|banquet_hall"](around:${searchRadius * 1000},${lat},${lng});
      way["amenity"~"events_venue|community_centre|conference_centre|townhall|hall|marriage_hall|banquet_hall"](around:${searchRadius * 1000},${lat},${lng});
      node["tourism"~"hotel|resort|guest_house"](around:${searchRadius * 1000},${lat},${lng});
      way["tourism"~"hotel|resort|guest_house"](around:${searchRadius * 1000},${lat},${lng});
      node["leisure"~"resort"](around:${searchRadius * 1000},${lat},${lng});
      way["leisure"~"resort"](around:${searchRadius * 1000},${lat},${lng});
    );
    out center;
  `;

    // Try each endpoint until one succeeds
    let lastError: Error | null = null;

    for (let i = 0; i < OVERPASS_ENDPOINTS.length; i++) {
        const endpoint = OVERPASS_ENDPOINTS[i];
        try {
            console.log(`Attempting Overpass API call to ${endpoint} (attempt ${i + 1}/${OVERPASS_ENDPOINTS.length})`);

            const response = await fetchWithTimeout(endpoint, {
                method: "POST",
                body: query,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }, 30000); // 30 second timeout to match query timeout

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Overpass API Error from ${endpoint}:`, errorText);
                throw new Error(`Failed to fetch venues: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`✓ Successfully fetched ${data.elements?.length || 0} venues from Overpass API`);

            // Map OSM data to Venue type
            const venues: Venue[] = (data.elements || []).map((element: any) => {
                const tags = element.tags || {};
                const elementLat = element.lat || element.center?.lat || lat;
                const elementLng = element.lon || element.center?.lon || lng;

                // Determine name
                const name = tags.name || tags["addr:housename"] || tags.description || "Unknown Venue";
                const nameLower = name.toLowerCase();

                // Determine type
                let type: Venue["type"] = "party_hall"; // Default to Party Hall for all generic event venues

                // Tag-based detection
                if (tags.tourism === "hotel" || tags.tourism === "guest_house") type = "hotel";
                else if (tags.leisure === "resort" || tags.tourism === "resort") type = "resort";
                else if (tags.amenity === "events_venue" || tags.amenity === "conference_centre") type = "party_hall";
                else if (tags.amenity === "hall" || tags.amenity === "marriage_hall") type = "party_hall";

                // Name-based refinement (Overrides if name strongly indicates a type)
                if (nameLower.includes("hotel") || nameLower.includes("grand") || nameLower.includes("inn") || nameLower.includes("residency")) {
                    if (type !== "resort") type = "hotel";
                }
                if (nameLower.includes("resort") || nameLower.includes("retreat")) type = "resort";
                if (nameLower.includes("convention") || nameLower.includes("banquet") || nameLower.includes("palace")) type = "party_hall";
                if (nameLower.includes("mandap") || nameLower.includes("kalyana") || nameLower.includes("gardens")) type = "party_hall";
                if (nameLower.includes("function") || nameLower.includes("marriage") || nameLower.includes("hall")) type = "party_hall";

                // Determine address
                const address = [
                    tags["addr:housenumber"],
                    tags["addr:street"],
                    tags["addr:suburb"]
                ].filter(Boolean).join(", ") || "Address not available";

                const city = tags["addr:city"] || "City not available";

                return {
                    id: String(element.id),
                    name: name,
                    type: type,
                    address: address,
                    city: city,
                    state: tags["addr:state"] || "",
                    country: tags["addr:country"] || "",
                    latitude: elementLat,
                    longitude: elementLng,
                    capacity: {
                        min: 0, // Not available in OSM usually
                        max: 0
                    },
                    priceRange: {
                        min: 0, // Not available in OSM
                        max: 0,
                        currency: "USD" // Default
                    },
                    contact: {
                        phone: tags.phone || tags["contact:phone"] || "Not available",
                        email: tags.email || tags["contact:email"] || "Not available",
                        website: tags.website || tags["contact:website"]
                    },
                    images: [], // No images in OSM
                    amenities: [
                        tags.internet_access === "yes" || tags.wifi === "yes" ? "WiFi" : null,
                        tags.wheelchair === "yes" ? "Wheelchair Accessible" : null,
                        tags.air_conditioning === "yes" ? "AC" : null,
                        tags.parking === "yes" ? "Parking" : null
                    ].filter(Boolean) as string[],
                    rating: undefined, // No rating in OSM
                    reviews: undefined
                };
            });

            // Filter out venues without proper names
            const filteredVenues = venues.filter(v => v.name !== "Unknown Venue");
            console.log(`✓ Returning ${filteredVenues.length} valid venues`);
            return filteredVenues;

        } catch (error) {
            lastError = error as Error;
            console.error(`Failed to fetch from ${endpoint}:`, error);

            // If this isn't the last endpoint, try the next one
            if (i < OVERPASS_ENDPOINTS.length - 1) {
                console.log(`Trying next endpoint...`);
                continue;
            }
        }
    }

    // All endpoints failed
    console.error("All Overpass API endpoints failed. Last error:", lastError);
    throw lastError || new Error("Failed to fetch venues from all Overpass API endpoints");
}

// GOOGLE PLACES API IMPLEMENTATION
// Calls through a server-side Next.js proxy to avoid CORS issues with direct browser requests
export async function fetchVenuesGoogle(lat: number, lng: number, radiusKm: number): Promise<Venue[]> {
    const radiusMeters = radiusKm * 1000;

    try {
        // Call our local API route which proxies the request server-side
        const proxyUrl = `/api/places?lat=${lat}&lng=${lng}&radius=${radiusMeters}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            console.error("Google Places Proxy Error:", response.status, response.statusText);
            return [];
        }

        const data = await response.json();

        if (data.status === "NO_API_KEY") {
            console.warn("Google Places API Key is missing or not configured in .env.local");
            return [];
        }

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("Google Places API Status:", data.status, data.error_message);
            return [];
        }

        return (data.results || []).map((place: {
            place_id: string;
            name: string;
            types: string[];
            vicinity: string;
            geometry: { location: { lat: number; lng: number } };
            rating?: number;
            user_ratings_total?: number;
            photos?: string[];
            phone?: string;
            website?: string;
            googleMapsUri?: string;
            openingHours?: string[];
        }) => {
            let type: Venue["type"] = "party_hall";
            const types = place.types || [];
            const nameLower = place.name.toLowerCase();

            if (types.includes("lodging") || types.includes("hotel")) type = "hotel";
            if (nameLower.includes("resort")) type = "resort";
            if (nameLower.includes("hall") || nameLower.includes("mandap") || nameLower.includes("kalyana") || nameLower.includes("banquet") || nameLower.includes("function") || nameLower.includes("marriage")) type = "party_hall";

            return {
                id: `google_${place.place_id}`,
                name: place.name,
                type: type,
                address: place.vicinity || "Address not available",
                city: "",
                state: "",
                country: "",
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                capacity: { min: 0, max: 0 },
                priceRange: { min: 0, max: 0, currency: "INR" },
                contact: {
                    phone: place.phone || "Not available",
                    email: "Not available", // Not provided by Google Places API
                    website: place.website || place.googleMapsUri || undefined,
                },
                images: place.photos || [],
                amenities: place.openingHours
                    ? [`Hours: ${place.openingHours[0]?.split(": ")[1] || "See Google Maps"}`]
                    : [],
                rating: place.rating,
                reviews: place.user_ratings_total
            };
        });

    } catch (error) {
        console.error("Error fetching Google venues via proxy:", error);
        return [];
    }
}

