"use client";

import AddVenueForm from "@/components/venue/AddVenueForm";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AddVenuePage() {
    const [isVerified, setIsVerified] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const [error, setError] = useState("");

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode === "ADMIN2025") {
            setIsVerified(true);
            setError("");
        } else {
            setError("Invalid access code");
        }
    };

    if (!isVerified) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <Link
                    href="/"
                    className="absolute top-8 left-8 inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>

                <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="p-3 bg-purple-100 rounded-full mb-4">
                            <Lock className="w-6 h-6 text-purple-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Access Required</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Please enter the access code to list a new venue.
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                placeholder="Enter Access Code"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            />
                            {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full">
                            Verify Access
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">List Your Venue</h1>
                    <p className="text-gray-600 mt-2">
                        Join our network of premium venues. Fill in the details below to get listed.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <AddVenueForm />
                </div>
            </div>
        </div>
    );
}
