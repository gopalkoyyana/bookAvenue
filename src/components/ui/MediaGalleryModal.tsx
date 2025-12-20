"use client";

import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface MediaGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    video?: string;
    title: string;
}

export default function MediaGalleryModal({ isOpen, onClose, images, video, title }: MediaGalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    // Combine media for navigation (video will be treated separately or as an item? 
    // Let's keep video separate toggle for simplicity or just add it to the flow if valid format.
    // For now, let's have a "View Photos" and "View Video" toggle if video exists, 
    // or just array them. Simplest is strict separation or array. 
    // Let's stick to: Images loop. Video is a separate mode or just appended.
    // Let's append video as the last slide if it exists.

    const mediaItems = [...images];
    if (video) {
        // We'll handle video logic separately to avoid type mess in array
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const nextSlide = () => {
        if (showVideo) return; // No next on video for now
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        if (showVideo) return;
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-50"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">

                {/* Header/Tabs */}
                <div className="absolute top-0 left-0 right-0 flex justify-center gap-4 p-4 z-40">
                    <button
                        onClick={() => setShowVideo(false)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!showVideo ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                        Photos ({images.length})
                    </button>
                    {video && (
                        <button
                            onClick={() => setShowVideo(true)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${showVideo ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                        >
                            <span className="flex items-center gap-2">
                                <Play className="w-3 h-3 fill-current" /> Video
                            </span>
                        </button>
                    )}
                </div>

                {/* Main View */}
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                    {showVideo && video ? (
                        <div className="w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex items-center justify-center">
                            <video
                                src={video}
                                controls
                                autoPlay
                                className="max-w-full max-h-full"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ) : (
                        <>
                            {/* Previous Button */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-blue-600/80 transition-all backdrop-blur-sm z-30"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Image */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {images.length > 0 ? (
                                    <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                                        <Image
                                            src={images[currentIndex]}
                                            alt={`${title} - Photo ${currentIndex + 1}`}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="text-gray-500">No images available</div>
                                )}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-blue-600/80 transition-all backdrop-blur-sm z-30"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Counter/Caption */}
                            <div className="absolute bottom-4 bg-black/60 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm">
                                {currentIndex + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Thumbnail Strip (Photos only) */}
                {!showVideo && images.length > 0 && (
                    <div className="absolute bottom-0 w-full p-4 overflow-x-auto">
                        <div className="flex justify-center gap-2">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentIndex === idx ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
