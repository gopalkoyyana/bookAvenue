
const https = require('https');

const searchRadius = 5;
const lat = 17.385;
const lng = 78.4867;

const query = `
    [out:json][timeout:90];
    (
      node["leisure"~"resort|park|garden|bandstand"](around:${searchRadius * 1000},${lat},${lng});
      node["tourism"~"hotel|guest_house|hostel|resort"](around:${searchRadius * 1000},${lat},${lng});
      node["amenity"~"events_venue|community_centre|conference_centre|public_building|townhall|hall|marriage_hall|social_facility"](around:${searchRadius * 1000},${lat},${lng});
      
      // OPTIMIZED REGEX WITH CASE INSENSITIVITY
      node["name"~"ttd|kalyana|mandap|convention|banquet|gardens", "i"](around:${searchRadius * 1000},${lat},${lng});
    );
    out center;
  `;

console.log("Sending OPTIMIZED query...");

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
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Overpass API Error Status: ${res.statusCode}`);
            console.error("Overpass API Error Text:", data);
        } else {
            try {
                const jsonData = JSON.parse(data);
                console.log(`Success! Found ${jsonData.elements.length} elements.`);
            } catch (e) { console.error("Error parsing JSON:", e); }
        }
    });
});
req.on('error', (e) => console.error(e));
req.write(query);
req.end();
