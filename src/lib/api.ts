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

export async function fetchVenues(lat: number, lng: number, radiusKm: number): Promise<Venue[]> {
    // Treat 0 km as 500 meters (0.5 km) for very local searches
    const searchRadius = radiusKm === 0 ? 0.5 : radiusKm;

    // Validate inputs
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        console.error("Invalid coordinates for venue search:", { lat, lng });
        return [];
    }

    // Overpass API query to find venues
    // We look for nodes, ways, and relations with specific tags
    // note: comments inside the query string can sometimes cause issues with parsing if newlines aren't preserved, removing them for safety.
    const query = `
    [out:json][timeout:90];
    (
      node["leisure"~"resort|park|garden|bandstand"](around:${searchRadius * 1000},${lat},${lng});
      way["leisure"~"resort|park|garden|bandstand"](around:${searchRadius * 1000},${lat},${lng});
      node["tourism"~"hotel|guest_house|hostel|resort"](around:${searchRadius * 1000},${lat},${lng});
      way["tourism"~"hotel|guest_house|hostel|resort"](around:${searchRadius * 1000},${lat},${lng});
      node["amenity"~"events_venue|community_centre|conference_centre|public_building|townhall|hall|marriage_hall|social_facility"](around:${searchRadius * 1000},${lat},${lng});
      way["amenity"~"events_venue|community_centre|conference_centre|public_building|townhall|hall|marriage_hall|social_facility"](around:${searchRadius * 1000},${lat},${lng});
      node["name"~"[Tt][Tt][Dd]|[Kk]alyana|[Mm]andap|[Cc]onvention|[Bb]anquet|[Gg]ardens"](around:${searchRadius * 1000},${lat},${lng});
      way["name"~"[Tt][Tt][Dd]|[Kk]alyana|[Mm]andap|[Cc]onvention|[Bb]anquet|[Gg]ardens"](around:${searchRadius * 1000},${lat},${lng});
    );
    out center;
  `;

    try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: query,
        });

        if (!response.ok) {
            const errorText = await response.text();
            // eslint-disable-next-line no-console
            console.error("Overpass API Error:", errorText);
            throw new Error(`Failed to fetch venues: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Map OSM data to Venue type
        const venues: Venue[] = data.elements.map((element: any) => {
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
            else if (tags.leisure === "resort") type = "resort";
            else if (tags.amenity === "events_venue" || tags.amenity === "conference_centre" || tags.amenity === "social_facility") type = "party_hall";
            else if (tags.amenity === "hall" || tags.amenity === "marriage_hall") type = "party_hall";

            // Name-based refinement (Overrides if name strongly indicates a type)
            if (nameLower.includes("hotel") || nameLower.includes("grand") || nameLower.includes("inn") || nameLower.includes("residency")) {
                if (type !== "resort") type = "hotel";
            }
            if (nameLower.includes("resort") || nameLower.includes("retreat")) type = "resort";
            if (nameLower.includes("convention") || nameLower.includes("banquet") || nameLower.includes("palace")) type = "party_hall";
            if (nameLower.includes("mandap") || nameLower.includes("kalyana") || nameLower.includes("gardens")) type = "party_hall";

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

        // Filter out venues without names if desired, or keep them
        // Also filter by actual distance if needed, though Overpass handles 'around'
        return venues.filter(v => v.name !== "Unknown Venue");

    } catch (error) {
        console.error("Error fetching venues:", error);
        return [];
    }
}

// GOOGLE PLACES API IMPLEMENTATION (For Testing)
export async function fetchVenuesGoogle(lat: number, lng: number, radiusKm: number): Promise<Venue[]> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
        console.warn("Google Places API Key is missing. Add NEXT_PUBLIC_GOOGLE_PLACES_API_KEY to your .env file.");
        return [];
    }

    const radiusMeters = radiusKm * 1000;
    // Using simple Nearby Search
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusMeters}&type=point_of_interest&keyword=party+hall|resort|hotel|banquet&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Google Places API Error:", response.status, response.statusText);
            return [];
        }
        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("Google Places API Status:", data.status, data.error_message);
            return [];
        }

        return (data.results || []).map((place: any) => {
            let type: Venue["type"] = "party_hall";
            const types = place.types || [];
            const nameLower = place.name.toLowerCase();

            if (types.includes("lodging") || types.includes("hotel")) type = "hotel";
            if (nameLower.includes("resort")) type = "resort";

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
                priceRange: { min: 0, max: 0, currency: "USD" },
                contact: {
                    phone: "Not available",
                    email: "Not available",
                    website: "Not available"
                },
                images: [],
                amenities: [],
                rating: place.rating,
                reviews: place.user_ratings_total
            };
        });

    } catch (error) {
        console.error("Error fetching Google venues:", error);
        return [];
    }
}
