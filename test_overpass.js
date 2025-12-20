
const https = require('https');

const searchRadius = 5;
const lat = 17.385;
const lng = 78.4867;

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

console.log("Sending query...");

const options = {
    hostname: 'overpass-api.de',
    path: '/api/interpreter',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(query),
        'User-Agent': 'BookPartyHallTest/1.0'
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Overpass API Error Status: ${res.statusCode}`);
            console.error("Overpass API Error Text:", data);
        } else {
            try {
                const jsonData = JSON.parse(data);
                console.log(`Success! Found ${jsonData.elements.length} elements.`);
            } catch (e) {
                console.error("Error parsing JSON:", e);
                console.log("Raw data:", data);
            }
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(query);
req.end();
