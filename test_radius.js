const apiKey = "AIzaSyB4Rds78Lo1CUoRHdFcWSTgwBZJEzHgUYo";
const lat = 18.5668; // Bobbili
const lng = 83.3665;
const radius = 5000; // 5km

async function testRestriction() {
    const body = JSON.stringify({
        textQuery: "function hall",
        locationRestriction: {
            circle: {
                center: { latitude: lat, longitude: lng },
                radius: radius
            }
        },
        maxResultCount: 10
    });

    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress"
        },
        body
    });

    const data = await response.json();
    console.log("RESTRICTION RESULTS:", JSON.stringify(data, null, 2));
}

async function testBias() {
    const body = JSON.stringify({
        textQuery: "function hall",
        locationBias: {
            circle: {
                center: { latitude: lat, longitude: lng },
                radius: radius
            }
        },
        maxResultCount: 10
    });

    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress"
        },
        body
    });

    const data = await response.json();
    console.log("BIAS RESULTS:", JSON.stringify(data, null, 2));
}

testRestriction().then(testBias);
