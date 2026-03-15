import { Venue } from "./types";

export const mockVenues: Venue[] = [];
export const countries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia",
    "Austria", "Bangladesh", "Belgium", "Brazil", "Canada",
    "Chile", "China", "Colombia", "Czech Republic", "Denmark",
    "Egypt", "Finland", "France", "Germany", "Greece",
    "Hong Kong", "Hungary", "India", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Italy", "Japan",
    "Jordan", "Kenya", "Malaysia", "Mexico", "Morocco",
    "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa",
    "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
    "Taiwan", "Thailand", "Turkey", "United Arab Emirates", "United Kingdom",
    "Ukraine", "United States", "Vietnam"
];

export const statesByCountry: Record<string, string[]> = {
    // India
    India: [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry"
    ],

    // United States
    "United States": [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ],

    // United Kingdom
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],

    // Canada
    Canada: [
        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
        "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
        "Quebec", "Saskatchewan", "Yukon"
    ],

    // Australia
    Australia: [
        "New South Wales", "Victoria", "Queensland", "Western Australia",
        "South Australia", "Tasmania", "Northern Territory", "Australian Capital Territory"
    ],

    // Germany
    Germany: [
        "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen",
        "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia",
        "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
    ],

    // France
    France: [
        "Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine",
        "Occitanie", "Hauts-de-France", "Brittany", "Normandy", "Grand Est", "Pays de la Loire",
        "Burgundy-Franche-Comté", "Centre-Val de Loire", "Corsica"
    ],

    // China
    China: [
        "Beijing", "Shanghai", "Guangdong", "Zhejiang", "Jiangsu",
        "Shandong", "Sichuan", "Hubei", "Henan", "Fujian",
        "Hunan", "Anhui", "Hebei", "Liaoning", "Shaanxi"
    ],

    // Japan
    Japan: [
        "Tokyo", "Osaka", "Kyoto", "Hokkaido", "Fukuoka",
        "Kanagawa", "Aichi", "Hyogo", "Saitama", "Chiba"
    ],

    // Brazil
    Brazil: [
        "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
        "Rio Grande do Sul", "Pernambuco", "Ceará", "Pará", "Santa Catarina"
    ],

    // Spain
    Spain: [
        "Madrid", "Catalonia", "Andalusia", "Valencia", "Galicia",
        "Castile and León", "Basque Country", "Castilla-La Mancha", "Canary Islands", "Murcia"
    ],

    // Italy
    Italy: [
        "Lazio", "Lombardy", "Campania", "Sicily", "Veneto",
        "Piedmont", "Emilia-Romagna", "Tuscany", "Apulia", "Calabria"
    ],

    // Mexico
    Mexico: [
        "Mexico City", "Jalisco", "Nuevo León", "Puebla", "Guanajuato",
        "Veracruz", "Chiapas", "Michoacán", "Oaxaca", "Chihuahua"
    ],

    // United Arab Emirates
    "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],

    // Saudi Arabia
    "Saudi Arabia": ["Riyadh", "Makkah", "Eastern Province", "Madinah", "Asir", "Qassim", "Tabuk"],

    // Singapore
    Singapore: ["Central", "East", "North", "North-East", "West"],

    // Other countries (single-level)
    Afghanistan: ["Kabul", "Herat", "Kandahar"],
    Argentina: ["Buenos Aires", "Córdoba", "Santa Fe"],
    Bangladesh: ["Dhaka", "Chittagong", "Khulna"],
    Egypt: ["Cairo", "Alexandria", "Giza"],
    Indonesia: ["Jakarta", "West Java", "East Java"],
    Malaysia: ["Kuala Lumpur", "Selangor", "Penang"],
    Nigeria: ["Lagos", "Kano", "Abuja"],
    Pakistan: ["Punjab", "Sindh", "Khyber Pakhtunkhwa"],
    Philippines: ["Metro Manila", "Cebu", "Davao"],
    "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal"],
    "South Korea": ["Seoul", "Busan", "Incheon"],
    Thailand: ["Bangkok", "Chiang Mai", "Phuket"],
    Turkey: ["Istanbul", "Ankara", "Izmir"],
    Vietnam: ["Hanoi", "Ho Chi Minh City", "Da Nang"]
};

export const citiesByState: Record<string, string[]> = {
    // India - ALL states with cities
    "Andhra Pradesh": [
        // Major Cities
        "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada", "Rajahmundry", "Kadapa", "Anantapur", "Kurnool",
        // District Headquarters and Major Towns
        "Vizianagaram", "Srikakulam", "Eluru", "Ongole", "Machilipatnam", "Tenali", "Chittoor", "Hindupur", "Proddatur", "Bhimavaram",
        "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Narasaraopet", "Rajampet", "Tadpatri", "Tadepalligudem", "Chilakaluripet",
        // Vizianagaram District Towns
        "Salur", "Bobbili", "Chipurupalli", "Garividi", "Parvathipuram", "Cheepurupalli", "Nellimarla", "Srungavarapukota", "Kothavalasa",
        "Bhogapuram", "Jami", "Vepada", "Merakamudidam", "Kurupam", "Komarada", "Pachipenta", "Mentada",
        // Srikakulam District Towns
        "Palasa", "Kasibugga", "Amadalavalasa", "Ichchapuram", "Narasannapeta", "Tekkali", "Pathapatnam", "Sompeta", "Palakonda",
        "Etcherla", "Kaviti", "Ranastalam", "Gara", "Mandasa",
        // Other Towns and Municipalities
        "Yemmiganur", "Kadiri", "Chirala", "Anakapalle", "Kavali", "Palacole", "Sullurpeta", "Tanuku", "Rayachoti", "Srikalahasti",
        "Bapatla", "Nandyal", "Tuni", "Gudur", "Nagari", "Markapur", "Ponnur", "Vinukonda", "Narasapuram", "Nuzvid", "Martur", "Adoni",
        "Jammalamadugu", "Punganur", "Puttur", "Renigunta", "Piler", "Palamaner", "Venkatagiri", "Atmakur", "Kandukur", "Addanki",
        "Sattenapalle", "Repalle", "Jaggayyapeta", "Vuyyuru", "Challapalli", "Amalapuram", "Pithapuram", "Ramachandrapuram", "Ravulapalem",
        "Mandapeta", "Samalkot", "Peddapuram", "Prattipadu", "Jaggampeta", "Tadepaligudem", "Kovvur", "Nidadavole", "Gopalapuram",
        "Bhimadole", "Akividu", "Narsapuram", "Bhimavaram", "Palakollu", "Narasapuram", "Attili", "Tadepalligudem",
        // Assembly Constituencies
        "Araku Valley", "Paderu", "Rampachodavaram", "Anakapalli", "Pendurthi", "Yelamanchili", "Payakaraopeta", "Narsipatnam",
        "Gajuwaka", "Bheemunipatnam", "Visakhapatnam East", "Visakhapatnam South", "Visakhapatnam North", "Visakhapatnam West",
        "Gannavaram", "Gudlavalleru", "Pedana", "Machilipatnam", "Avanigadda", "Pamarru", "Penamaluru", "Vijayawada Central",
        "Vijayawada East", "Vijayawada West", "Mylavaram", "Nandigama", "Jaggayyapeta", "Ponnuru", "Mangalagiri", "Tadikonda",
        "Rajam", "Palakonda", "Pathapatnam", "Tekkali", "Ichchapuram", "Srikakulam", "Amadalavalasa", "Etcherla", "Narasannapeta"
    ],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Kullu", "Solan"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    Karnataka: [
        // Major Cities
        "Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Gulbarga", "Davangere", "Bellary", "Bijapur", "Shimoga",
        // Towns and Municipalities
        "Tumkur", "Raichur", "Bidar", "Hospet", "Hassan", "Gadag-Betageri", "Udupi", "Robertson Pet", "Bhadravati", "Chitradurga",
        "Kolar", "Mandya", "Chikmagalur", "Gangavati", "Bagalkot", "Ranebennuru", "Robertsonpet", "Karwar", "Ranibennur", "Dandeli",
        "Sirsi", "Tiptur", "Arsikere", "Nanjangud", "Gokak", "Yadgir", "Rabkavi Banhatti", "Shahabad", "Siruguppa", "Sindhnur",
        // Assembly Constituencies
        "Bangalore South", "Bangalore North", "Bangalore Central", "Bangalore Rural", "Chamrajpet", "Chickpet", "Shivajinagar",
        "Shantinagar", "Gandhi Nagar", "Rajajinagar", "Yeshwanthpur", "Hebbal", "Pulakeshinagar", "Sarvagnanagar", "CV Raman Nagar",
        "Byatarayanapura", "KR Puram", "Mahadevapura", "Malleshwaram", "Dasarahalli", "Mahalakshmi Layout", "Rajarajeshwari Nagar",
        "Padmanabhanagar", "BTM Layout", "Jayanagar", "Basavanagudi", "Govindarajanagar", "Vijayanagar", "Chickballapur", "Doddaballapur"
    ],
    Kerala: [
        // District Headquarters (14 districts)
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam",
        "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod",

        // Major Cities and Towns
        "Kochi", "Ernakulam", "Aluva", "Perumbavoor", "Muvattupuzha", "Kothamangalam", "Angamaly",
        "Kalamassery", "Tripunithura", "Thrippunithura", "North Paravur", "Piravom",

        // Thiruvananthapuram District
        "Attingal", "Varkala", "Nedumangad", "Neyyattinkara", "Kazhakootam", "Technopark",

        // Kollam District
        "Karunagappally", "Punalur", "Paravur", "Kottarakkara", "Chavara",

        // Alappuzha District
        "Cherthala", "Kayamkulam", "Haripad", "Mavelikkara", "Chengannur",

        // Kottayam District
        "Changanassery", "Pala", "Ettumanoor", "Vaikom", "Erattupetta",

        // Idukki District
        "Thodupuzha", "Munnar", "Adimali", "Kattappana", "Nedumkandam",

        // Thrissur District
        "Chalakudy", "Guruvayur", "Kodungallur", "Irinjalakuda", "Wadakkanchery", "Kunnamkulam",

        // Palakkad District
        "Ottapalam", "Shoranur", "Mannarkkad", "Cherpulassery", "Pattambi", "Chittur",

        // Malappuram District
        "Manjeri", "Tirur", "Perinthalmanna", "Ponnani", "Nilambur", "Kottakkal", "Tanur",

        // Kozhikode District
        "Vadakara", "Koyilandy", "Feroke", "Ramanattukara", "Thamarassery", "Quilandy",

        // Wayanad District
        "Kalpetta", "Mananthavady", "Sulthan Bathery", "Vythiri",

        // Kannur District
        "Thalassery", "Payyanur", "Mattannur", "Iritty", "Taliparamba", "Kuthuparamba",

        // Kasaragod District
        "Kanhangad", "Nileshwar", "Manjeshwar", "Kasargod", "Bekal"
    ],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane"],
    Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
    Meghalaya: ["Shillong", "Tura", "Nongstoin", "Jowai"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Berhampur"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    "Tamil Nadu": [
        // Major Cities
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi",
        // Towns and Municipalities
        "Thanjavur", "Dindigul", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram", "Kumarapalayam",
        "Karaikkudi", "Neyveli", "Cuddalore", "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Gudiyatham", "Pudukkottai",
        "Vaniyambadi", "Ambur", "Nagapattinam", "Palani", "Virudhunagar", "Arakkonam", "Tindivanam", "Aruppukkottai", "Paramakudi",
        "Mayiladuthurai", "Valparai", "Sankarankovil", "Tenkasi", "Palladam", "Vadipatti", "Tirupathur", "Coonoor", "Mettupalayam",
        // Assembly Constituencies
        "Chennai Central", "Chennai North", "Chennai South", "Thousand Lights", "Anna Nagar", "Virugambakkam", "Saidapet", "Thiru Vi Ka Nagar",
        "Mylapore", "Velachery", "Sholinganallur", "Alandur", "Sriperumbudur", "Pallavaram", "Tambaram", "Chengalpattu", "Chepauk-Thiruvallikeni",
        "Egmore", "Royapuram", "Harbour", "Dr. Radhakrishnan Nagar", "Perambur", "Kolathur", "Thiru Vi Ka Nagar", "Villivakkam", "Maduravoyal",
        "Ambattur", "Avadi", "Tiruvottiyur", "Coimbatore North", "Coimbatore South", "Singanallur", "Sulur", "Kavundampalayam", "Pollachi"
    ],
    Telangana: [
        // Major Cities
        "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet",
        // Towns and Municipalities
        "Miryalaguda", "Jagtial", "Mancherial", "Nirmal", "Kamareddy", "Siddipet", "Sircilla", "Vikarabad", "Wanaparthy", "Medak",
        "Nagarkurnool", "Gadwal", "Sangareddy", "Jangaon", "Bhongir", "Palwancha", "Kothagudem", "Bodhan", "Armoor", "Tandur",
        "Narayanpet", "Kyathanpally", "Mahabubabad", "Bellampalli", "Peddapalli", "Koratla", "Manuguru", "Madhira", "Yellandu", "Banswada",
        "Zahirabad", "Kodad", "Huzurabad", "Metpally", "Sadasivpet", "Nakrekal", "Devarakonda", "Narayanpet", "Kalwakurthy", "Achampet",
        // Assembly Constituencies
        "Secunderabad", "Secunderabad Cantonment", "Jubilee Hills", "Khairatabad", "Amberpet", "Musheerabad", "Malakpet", "Karwan",
        "Goshamahal", "Charminar", "Chandrayangutta", "Yakutpura", "Bahadurpura", "Nampally", "Sanathnagar", "Serilingampally",
        "Kukatpally", "Quthbullapur", "LB Nagar", "Uppal", "Ibrahimpatnam", "Malkajgiri", "Medchal", "Mudhole", "Nirmal", "Khanapur",
        "Asifabad", "Chennur", "Bellampalli", "Mancherial", "Peddapalli", "Ramagundam", "Manthani", "Karimnagar", "Choppadandi", "Vemulawada"
    ],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad"],

    // USA - ALL 50 states with cities
    Alabama: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
    Alaska: ["Anchorage", "Fairbanks", "Juneau", "Sitka"],
    Arizona: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
    Arkansas: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale"],
    California: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    Colorado: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder"],
    Connecticut: ["Hartford", "New Haven", "Stamford", "Bridgeport"],
    Delaware: ["Wilmington", "Dover", "Newark", "Middletown"],
    Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
    Georgia: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
    Hawaii: ["Honolulu", "Hilo", "Kailua", "Kapolei"],
    Idaho: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
    Illinois: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"],
    Indiana: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
    Iowa: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
    Kansas: ["Wichita", "Overland Park", "Kansas City", "Topeka"],
    Kentucky: ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
    Louisiana: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
    Maine: ["Portland", "Lewiston", "Bangor", "South Portland"],
    Maryland: ["Baltimore", "Columbia", "Germantown", "Silver Spring"],
    Massachusetts: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
    Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"],
    Minnesota: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
    Mississippi: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
    Missouri: ["Kansas City", "Saint Louis", "Springfield", "Columbia"],
    Montana: ["Billings", "Missoula", "Great Falls", "Bozeman"],
    Nebraska: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
    Nevada: ["Las Vegas", "Henderson", "Reno", "North Las Vegas"],
    "New Hampshire": ["Manchester", "Nashua", "Concord", "Dover"],
    "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton"],
    "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
    "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
    "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot"],
    Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
    Oklahoma: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"],
    Oregon: ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro"],
    Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
    "Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket"],
    "South Carolina": ["Charleston", "Columbia", "North Charleston", "Mount Pleasant"],
    "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
    Tennessee: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
    Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
    Utah: ["Salt Lake City", "West Valley City", "Provo", "West Jordan"],
    Vermont: ["Burlington", "South Burlington", "Rutland", "Barre"],
    Virginia: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Arlington"],
    Washington: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    "West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg"],
    Wisconsin: ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
    Wyoming: ["Cheyenne", "Casper", "Laramie", "Gillette"],

    // Canada
    Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],

    // Australia
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast"],
    Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
    Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville"],
    "Western Australia": ["Perth", "Fremantle", "Mandurah"],

    // Germany
    Bavaria: ["Munich", "Nuremberg", "Augsburg", "Regensburg"],
    Berlin: ["Berlin"],
    Hamburg: ["Hamburg"],
    "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen"],

    // France
    "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Cannes"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne"],

    // China
    Beijing: ["Beijing"],
    Shanghai: ["Shanghai"],
    Guangdong: ["Guangzhou", "Shenzhen", "Dongguan", "Foshan"],
    Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],

    // Japan
    Tokyo: ["Tokyo", "Shibuya", "Shinjuku"],
    Osaka: ["Osaka", "Sakai"],
    Kyoto: ["Kyoto"],

    // Brazil
    "São Paulo": ["São Paulo", "Campinas", "Santos"],
    "Rio de Janeiro": ["Rio de Janeiro", "Niterói"],

    // Spain
    Madrid: ["Madrid", "Móstoles", "Alcalá de Henares"],
    Catalonia: ["Barcelona", "Tarragona", "Girona"],
    Andalusia: ["Seville", "Málaga", "Granada", "Córdoba"],

    // Italy
    Lazio: ["Rome", "Latina"],
    Lombardy: ["Milan", "Brescia", "Bergamo"],
    Campania: ["Naples", "Salerno"],

    // UAE
    Dubai: ["Dubai", "Deira", "Bur Dubai"],
    "Abu Dhabi": ["Abu Dhabi", "Al Ain"],
    Sharjah: ["Sharjah"],

    // Saudi Arabia
    Riyadh: ["Riyadh"],
    Makkah: ["Mecca", "Jeddah", "Taif"],
    "Eastern Province": ["Dammam", "Khobar", "Dhahran"],

    // Singapore
    Central: ["Downtown", "Orchard", "Marina Bay"],

    // Other locations
    Kabul: ["Kabul City"],
    "Buenos Aires": ["Buenos Aires City"],
    Dhaka: ["Dhaka City"],
    Cairo: ["Cairo City"],
    Jakarta: ["Jakarta City"],
    "Kuala Lumpur": ["Kuala Lumpur City"],
    Lagos: ["Lagos City"],
    "Metro Manila": ["Manila", "Quezon City", "Makati"],
    Gauteng: ["Johannesburg", "Pretoria"],
    Seoul: ["Seoul City"],
    Bangkok: ["Bangkok City"],
    Istanbul: ["Istanbul City"],
    Hanoi: ["Hanoi City"]
};

// City coordinates for map centering
export const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    // India - Major cities
    Hyderabad: { lat: 17.385, lng: 78.4867 },
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Bangalore: { lat: 12.9716, lng: 77.5946 },
    Chennai: { lat: 13.0827, lng: 80.2707 },
    "New Delhi": { lat: 28.6139, lng: 77.209 },
    Delhi: { lat: 28.7041, lng: 77.1025 },
    Kolkata: { lat: 22.5726, lng: 88.3639 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Visakhapatnam: { lat: 17.6869, lng: 83.2185 },
    Patna: { lat: 25.5941, lng: 85.1376 },
    Bhopal: { lat: 23.2599, lng: 77.4126 },
    Guwahati: { lat: 26.1445, lng: 91.7362 },
    Chandigarh: { lat: 30.7333, lng: 76.7794 },
    Thiruvananthapuram: { lat: 8.5241, lng: 76.9366 },
    Kochi: { lat: 9.9312, lng: 76.2673 },
    Nagpur: { lat: 21.1458, lng: 79.0882 },
    Indore: { lat: 22.7196, lng: 75.8577 },
    Coimbatore: { lat: 11.0168, lng: 76.9558 },
    Warangal: { lat: 17.9784, lng: 79.6004 },
    Bobbili: { lat: 18.5668, lng: 83.3665 },

    // USA - Major cities
    "New York City": { lat: 40.7128, lng: -74.006 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    Chicago: { lat: 41.8781, lng: -87.6298 },
    Houston: { lat: 29.7604, lng: -95.3698 },
    Phoenix: { lat: 33.4484, lng: -112.074 },
    Philadelphia: { lat: 39.9526, lng: -75.1652 },
    "San Antonio": { lat: 29.4241, lng: -98.4936 },
    "San Diego": { lat: 32.7157, lng: -117.1611 },
    Dallas: { lat: 32.7767, lng: -96.797 },
    "San Jose": { lat: 37.3382, lng: -121.8863 },
    Austin: { lat: 30.2672, lng: -97.7431 },
    Jacksonville: { lat: 30.3322, lng: -81.6557 },
    "Fort Worth": { lat: 32.7555, lng: -97.3308 },
    Columbus: { lat: 39.9612, lng: -82.9988 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    Charlotte: { lat: 35.2271, lng: -80.8431 },
    Indianapolis: { lat: 39.7684, lng: -86.1581 },
    Seattle: { lat: 47.6062, lng: -122.3321 },
    Denver: { lat: 39.7392, lng: -104.9903 },
    Boston: { lat: 42.3601, lng: -71.0589 },
    "El Paso": { lat: 31.7619, lng: -106.485 },
    Detroit: { lat: 42.3314, lng: -83.0458 },
    Nashville: { lat: 36.1627, lng: -86.7816 },
    Memphis: { lat: 35.1495, lng: -90.049 },
    Portland: { lat: 45.5152, lng: -122.6784 },
    "Oklahoma City": { lat: 35.4676, lng: -97.5164 },
    "Las Vegas": { lat: 36.1699, lng: -115.1398 },
    Louisville: { lat: 38.2527, lng: -85.7585 },
    Baltimore: { lat: 39.2904, lng: -76.6122 },
    Milwaukee: { lat: 43.0389, lng: -87.9065 },
    Albuquerque: { lat: 35.0844, lng: -106.6504 },
    Tucson: { lat: 32.2226, lng: -110.9747 },
    Fresno: { lat: 36.7378, lng: -119.7871 },
    Sacramento: { lat: 38.5816, lng: -121.4944 },
    Miami: { lat: 25.7617, lng: -80.1918 },
    Orlando: { lat: 28.5383, lng: -81.3792 },
    Tampa: { lat: 27.9506, lng: -82.4572 },
    Atlanta: { lat: 33.749, lng: -84.388 },

    // UK
    London: { lat: 51.5074, lng: -0.1278 },
    Manchester: { lat: 53.4808, lng: -2.2426 },
    Birmingham: { lat: 52.4862, lng: -1.8904 },
    Edinburgh: { lat: 55.9533, lng: -3.1883 },
    Glasgow: { lat: 55.8642, lng: -4.2518 },
    Liverpool: { lat: 53.4084, lng: -2.9916 },

    // Canada
    Toronto: { lat: 43.6532, lng: -79.3832 },
    Montreal: { lat: 45.5017, lng: -73.5673 },
    Vancouver: { lat: 49.2827, lng: -123.1207 },
    Calgary: { lat: 51.0447, lng: -114.0719 },
    Ottawa: { lat: 45.4215, lng: -75.6972 },

    // Australia
    Sydney: { lat: -33.8688, lng: 151.2093 },
    Melbourne: { lat: -37.8136, lng: 144.9631 },
    Brisbane: { lat: -27.4698, lng: 153.0251 },
    Perth: { lat: -31.9505, lng: 115.8605 },

    // Europe
    Paris: { lat: 48.8566, lng: 2.3522 },
    Berlin: { lat: 52.52, lng: 13.405 },
    Madrid: { lat: 40.4168, lng: -3.7038 },
    Rome: { lat: 41.9028, lng: 12.4964 },
    Amsterdam: { lat: 52.3676, lng: 4.9041 },
    Barcelona: { lat: 41.3851, lng: 2.1734 },
    Munich: { lat: 48.1351, lng: 11.582 },
    Milan: { lat: 45.4642, lng: 9.19 },

    // Asia
    Tokyo: { lat: 35.6762, lng: 139.6503 },
    Singapore: { lat: 1.3521, lng: 103.8198 },
    "Hong Kong": { lat: 22.3193, lng: 114.1694 },
    Dubai: { lat: 25.2048, lng: 55.2708 },
    Bangkok: { lat: 13.7563, lng: 100.5018 },
    Shanghai: { lat: 31.2304, lng: 121.4737 },
    Beijing: { lat: 39.9042, lng: 116.4074 },
    Seoul: { lat: 37.5665, lng: 126.978 },

    // Middle East
    "Abu Dhabi": { lat: 24.4539, lng: 54.3773 },
    Riyadh: { lat: 24.7136, lng: 46.6753 },
    Doha: { lat: 25.2854, lng: 51.5310 },

    // South America
    "São Paulo": { lat: -23.5505, lng: -46.6333 },
    "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
    "Buenos Aires": { lat: -34.6037, lng: -58.3816 },
};

// Helper to check mock availability
export const checkAvailability = (venueId: string, date: string): boolean => {
    if (!date) return true;
    // Create a simple hash from venueId and date string
    const str = venueId + date;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Return true (available) for ~70% of cases, false (booked) for ~30%
    return Math.abs(hash % 10) > 2;
};
