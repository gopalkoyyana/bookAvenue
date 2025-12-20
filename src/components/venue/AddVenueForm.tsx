"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Upload, MapPin, Building, Users, IndianRupee, Phone, Image as ImageIcon, CheckCircle2, RotateCcw, X, ArrowLeft, Globe, Loader2, Film, Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic import for map to avoid SSR issues
const LocationPicker = dynamic(
    () => import("@/components/map/LocationPicker"),
    { ssr: false, loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center"><Loader2 className="w-8 h-8 text-purple-600 animate-spin" /></div> }
);

const initialFormData = {
    name: "",
    type: "party_hall",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    latitude: 17.385,
    longitude: 78.4867,
    capacityMin: "",
    capacityMax: "",
    priceMin: "",
    priceMax: "",
    phone: "",
    email: "",
    website: "",
    amenities: [] as string[],
};

export default function AddVenueForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [role, setRole] = useState("Admin"); // Default role since access is verified by parent

    const [formData, setFormData] = useState(initialFormData);

    // Media State
    const [media, setMedia] = useState({
        photos: [] as File[],
        video: null as File | null,
        coverIndex: 0
    });

    const hiddenPhotoInput = useRef<HTMLInputElement>(null);
    const hiddenVideoInput = useRef<HTMLInputElement>(null);

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the form? All entered data will be lost.")) {
            setFormData(initialFormData);
            setMedia({ photos: [], video: null, coverIndex: 0 });
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            router.push("/");
        }
    };

    const handleBack = () => {
        router.back();
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng
        }));
    };

    const amenitiesList = [
        "AC", "Parking", "Catering", "DJ", "Decoration",
        "Rooms", "WiFi", "Power Backup", "Valet Parking",
        "Projector", "Stage", "Sound System"
    ];

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newPhotos = Array.from(e.target.files);
            if (media.photos.length + newPhotos.length > 5) {
                alert("You can only upload a maximum of 5 photos.");
                return;
            }
            setMedia(prev => ({
                ...prev,
                photos: [...prev.photos, ...newPhotos]
            }));
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const video = e.target.files[0];
            // Basic size check (e.g. 50MB) - exact duration check requires loading metadata
            if (video.size > 50 * 1024 * 1024) {
                alert("Video size too large. Please upload one under 50MB.");
                return;
            }
            setMedia(prev => ({ ...prev, video: video }));
        }
    };

    const removePhoto = (index: number) => {
        setMedia(prev => {
            const newPhotos = [...prev.photos];
            newPhotos.splice(index, 1);
            let newCoverIndex = prev.coverIndex;
            if (index === prev.coverIndex) newCoverIndex = 0;
            if (index < prev.coverIndex) newCoverIndex--;
            return { ...prev, photos: newPhotos, coverIndex: newCoverIndex };
        });
    };

    const setCoverPhoto = (index: number) => {
        setMedia(prev => ({ ...prev, coverIndex: index }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleAmenity = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form Data Submitted:", { role, ...formData });
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Redirect after success
        setTimeout(() => {
            router.push("/");
        }, 2000);
    };



    if (submitSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Venue Submitted Successfully!</h2>
                <p className="text-gray-600">Your venue details have been sent for verification.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Role Display */}
            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 flex items-center justify-between">
                <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Logged in as</span>
                    <div className="text-lg font-bold text-blue-100 capitalize">{role}</div>
                </div>
                <div className="h-8 w-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Building className="w-5 h-5 text-blue-500" />
                    Venue Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Venue Name</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="e.g. Grand Palace Convention Center"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Venue Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="party_hall">Party / Function Hall</option>
                            <option value="hotel">Hotel</option>
                            <option value="resort">Resort</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Location
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Full street address"
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                            <input
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
                            <input
                                required
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">ZIP Code</label>
                            <input
                                name="zip"
                                value={formData.zip}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Map Location Picker */}
                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Pin Location on Map</label>
                        <p className="text-xs text-gray-500 mb-3">Click on the map or click &quot;Use My Location&quot; to set the details.</p>
                        <LocationPicker
                            latitude={formData.latitude}
                            longitude={formData.longitude}
                            onLocationSelect={handleLocationSelect}
                        />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <label className="text-xs text-gray-500">Latitude</label>
                                <div className="text-sm font-mono bg-gray-800 px-3 py-1.5 rounded text-gray-300">{formData.latitude?.toFixed(6)}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Longitude</label>
                                <div className="text-sm font-mono bg-gray-800 px-3 py-1.5 rounded text-gray-300">{formData.longitude?.toFixed(6)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Capacity & Pricing */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-blue-500" />
                    Capacity & Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Guest Capacity</label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                name="capacityMin"
                                placeholder="Min"
                                value={formData.capacityMin}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <input
                                type="number"
                                name="capacityMax"
                                placeholder="Max"
                                value={formData.capacityMax}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Price Range (₹)</label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                name="priceMin"
                                placeholder="Min Price"
                                value={formData.priceMin}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <input
                                type="number"
                                name="priceMax"
                                placeholder="Max Price"
                                value={formData.priceMax}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {amenitiesList.map((amenity) => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
                            <input
                                type="checkbox"
                                checked={formData.amenities.includes(amenity)}
                                onChange={() => toggleAmenity(amenity)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                            />
                            <span className="text-sm text-gray-300">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="contact@venue.com"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Website (Optional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Globe className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 hover:border-blue-500/50 transition-colors outline-none"
                                placeholder="https://www.example.com"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-white mb-4">
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                        Photos & Video
                    </h3>

                    {/* Photos Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-300">Photos (Max 5)</label>
                            <span className="text-xs text-gray-500">{media.photos.length}/5 uploaded</span>
                        </div>

                        {media.photos.length === 0 ? (
                            <div
                                onClick={() => hiddenPhotoInput.current?.click()}
                                className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-800/50"
                            >
                                <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                                <p className="text-sm text-gray-300 font-medium">Click to upload venue photos</p>
                                <p className="text-xs text-gray-500 mt-1">First photo will be the cover image by default</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {media.photos.map((photo, index) => (
                                    <div key={index} className={`relative aspect-square rounded-lg overflow-hidden border-2 group ${media.coverIndex === index ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-700'}`}>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt={`Preview ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setCoverPhoto(index)}
                                                className={`p-1.5 rounded-full ${media.coverIndex === index ? 'bg-yellow-400 text-white' : 'bg-gray-800 text-gray-300 hover:text-yellow-400'}`}
                                                title="Set as Cover"
                                            >
                                                <Star className={`w-4 h-4 ${media.coverIndex === index ? 'fill-current' : ''}`} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="p-1.5 rounded-full bg-gray-800 text-red-500 hover:bg-red-500/20"
                                                title="Remove"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {media.coverIndex === index && (
                                            <div className="absolute top-1 left-1 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded shadow-sm">
                                                COVER
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {media.photos.length < 5 && (
                                    <div
                                        onClick={() => hiddenPhotoInput.current?.click()}
                                        className="aspect-square rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 hover:border-blue-400 transition-colors bg-gray-800/30"
                                    >
                                        <Upload className="w-6 h-6 text-gray-500 mb-1" />
                                        <span className="text-xs text-gray-500">Add More</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <input
                            type="file"
                            ref={hiddenPhotoInput}
                            onChange={handlePhotoUpload}
                            className="hidden"
                            multiple
                            accept="image/*"
                        />
                    </div>

                    {/* Video Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Video (Max 1)</label>
                        {!media.video ? (
                            <div
                                onClick={() => hiddenVideoInput.current?.click()}
                                className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-800/50 flex flex-col items-center"
                            >
                                <Film className="w-8 h-8 text-blue-400 mb-2" />
                                <p className="text-sm text-gray-300 font-medium">Upload a video tour</p>
                                <p className="text-xs text-gray-500 mt-1">Max 10 seconds • Max 50MB</p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-700 rounded-lg">
                                        <Film className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white truncate max-w-[200px]">{media.video.name}</p>
                                        <p className="text-xs text-gray-400">{(media.video.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMedia(prev => ({ ...prev, video: null }))}
                                    className="p-2 hover:bg-gray-700 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={hiddenVideoInput}
                            onChange={handleVideoUpload}
                            className="hidden"
                            accept="video/*"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 flex flex-col-reverse md:flex-row items-center gap-4 justify-between border-t border-gray-800 mt-8">
                {/* Back Button */}
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="w-full md:w-auto text-gray-400 hover:text-white hover:bg-gray-800"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Reset Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="w-full md:w-auto text-gray-400 hover:text-red-400 hover:bg-red-900/10"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>

                    {/* Cancel Button */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="w-full md:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full md:w-auto min-w-[180px]"
                    >
                        {isSubmitting ? "Submitting..." : "List Venue"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
