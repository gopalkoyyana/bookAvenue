import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");

    if (!lat || !lng || !radius) {
        return NextResponse.json({ error: "Missing required parameters: lat, lng, radius" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim();
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        return NextResponse.json({ results: [], status: "NO_API_KEY" });
    }

    const searchTerms = [
        "function hall",
        "marriage hall",
        "kalyana mandapam",
        "banquet hall",
        "convention hall",
        "community hall",
        "resort",
        "hotel"
    ];

    const allResults: {
        place_id: string;
        name: string;
        vicinity: string;
        geometry: { location: { lat: number; lng: number } };
        types: string[];
        rating?: number;
        user_ratings_total?: number;
        photos: string[];
        phone?: string;
        website?: string;
        googleMapsUri?: string;
        openingHours?: string[];
    }[] = [];
    const seenIds = new Set<string>();

    for (const term of searchTerms) {
        try {
            const body = JSON.stringify({
                textQuery: term,
                locationBias: {
                    circle: {
                        center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
                        radius: parseFloat(radius)
                    }
                },
                maxResultCount: 20
            });

            const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": [
                        "places.id",
                        "places.displayName",
                        "places.formattedAddress",
                        "places.location",
                        "places.types",
                        "places.rating",
                        "places.userRatingCount",
                        "places.photos",
                        "places.nationalPhoneNumber",
                        "places.websiteUri",
                        "places.googleMapsUri",
                        "places.regularOpeningHours"
                    ].join(",")
                },
                body,
                signal: AbortSignal.timeout(10000)
            });

            if (!response.ok) {
                console.error(`[Places API] Error for "${term}":`, await response.text());
                continue;
            }

            const data = await response.json();
            if (data.error) {
                console.error(`[Places API] API error for "${term}":`, data.error.message);
                continue;
            }

            const places = data.places || [];
            console.log(`[Places API] "${term}": ${places.length} results`);

            for (const place of places) {
                if (!seenIds.has(place.id)) {
                    seenIds.add(place.id);

                    // Build photo URLs using our own photo proxy to avoid exposing API key in client
                    // We store the photo 'name' references and proxy them server-side
                    const photoNames: string[] = (place.photos || [])
                        .slice(0, 5) // Limit to 5 photos per venue
                        .map((p: { name: string }) => p.name);

                    // Convert to proxied URLs: /api/photo?ref=<photoName>
                    const photoUrls = photoNames.map(
                        (name) => `/api/photo?ref=${encodeURIComponent(name)}`
                    );

                    allResults.push({
                        place_id: place.id,
                        name: place.displayName?.text || "Unknown Venue",
                        vicinity: place.formattedAddress || "",
                        geometry: {
                            location: {
                                lat: place.location?.latitude || parseFloat(lat),
                                lng: place.location?.longitude || parseFloat(lng)
                            }
                        },
                        types: place.types || [],
                        rating: place.rating,
                        user_ratings_total: place.userRatingCount,
                        photos: photoUrls,
                        phone: place.nationalPhoneNumber || undefined,
                        website: place.websiteUri || undefined,
                        googleMapsUri: place.googleMapsUri || undefined,
                        openingHours: place.regularOpeningHours?.weekdayDescriptions || undefined
                    });
                }
            }
        } catch (err) {
            console.error(`[Places API] Fetch error for "${term}":`, err);
        }
    }

    console.log(`[Places API] Total unique results: ${allResults.length}`);
    return NextResponse.json({
        results: allResults,
        status: allResults.length > 0 ? "OK" : "ZERO_RESULTS"
    });
}
