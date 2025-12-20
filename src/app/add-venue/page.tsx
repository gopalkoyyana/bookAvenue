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
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <Link
                    href="/"
                    className="absolute top-8 left-8 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>

                <div className="bg-gray-900 max-w-md w-full rounded-2xl shadow-2xl shadow-blue-900/20 p-8 border border-gray-800">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="p-3 bg-blue-900/20 rounded-full mb-4 ring-1 ring-blue-500/20">
                            <Lock className="w-6 h-6 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Access Required</h1>
                        <p className="text-gray-400 mt-2 text-sm">
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
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-500"
                            />
                            {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
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
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-white">List Your Venue</h1>
                    <p className="text-gray-400 mt-2">
                        Join our network of premium venues. Fill in the details below to get listed.
                    </p>
                </div>

                <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-6 md:p-8">
                    <AddVenueForm />
                </div>
            </div>
        </div>
    );
}
