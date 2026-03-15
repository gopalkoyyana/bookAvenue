import { NextRequest, NextResponse } from "next/server";

// Photo proxy - fetches Google Places photos server-side so API key is never exposed to client
export async function GET(request: NextRequest) {
    const ref = request.nextUrl.searchParams.get("ref");
    if (!ref) {
        return new NextResponse("Missing ref parameter", { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        return new NextResponse("API key not configured", { status: 503 });
    }

    const photoUrl = `https://places.googleapis.com/v1/${ref}/media?maxWidthPx=800&skipHttpRedirect=true&key=${apiKey}`;

    try {
        const response = await fetch(photoUrl, {
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            console.error("[Photo Proxy] Failed:", response.status);
            return new NextResponse("Photo not found", { status: 404 });
        }

        const data = await response.json();
        const imageUri = data.photoUri;

        if (!imageUri) {
            return new NextResponse("No photo URI", { status: 404 });
        }

        // Now fetch the actual image bytes and stream them to client
        const imageResponse = await fetch(imageUri, {
            signal: AbortSignal.timeout(10000)
        });

        if (!imageResponse.ok) {
            return new NextResponse("Image fetch failed", { status: 502 });
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get("content-type") || "image/jpeg";

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800", // Cache for 1 day
            }
        });
    } catch (err) {
        console.error("[Photo Proxy] Error:", err);
        return new NextResponse("Photo proxy error", { status: 500 });
    }
}
