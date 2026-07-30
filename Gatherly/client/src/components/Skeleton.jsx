import React from 'react';

export const EventCardSkeleton = () => {
    return (
        <div className="bg-bg-card border border-border-color rounded-2xl overflow-hidden flex flex-col animate-pulse">
            <div className="h-52 bg-bg-surface/80 relative">
                <div className="absolute top-4 right-4 w-16 h-6 bg-border-color/50 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-6 bg-border-color/50 rounded-full"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col space-y-4">
                <div className="h-6 bg-border-color/60 rounded-md w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-border-color/40 rounded-md w-1/2"></div>
                    <div className="h-4 bg-border-color/40 rounded-md w-2/3"></div>
                </div>
                <div className="mt-auto pt-4 space-y-3">
                    <div className="h-2 bg-border-color/40 rounded-full w-full"></div>
                    <div className="h-10 bg-border-color/50 rounded-xl w-full"></div>
                </div>
            </div>
        </div>
    );
};

export const CardSkeleton = () => {
    return (
        <div className="bg-bg-card border border-border-color rounded-2xl p-6 space-y-4 animate-pulse">
            <div className="w-12 h-12 bg-border-color/60 rounded-xl"></div>
            <div className="h-6 bg-border-color/60 rounded-md w-2/3"></div>
            <div className="h-4 bg-border-color/40 rounded-md w-full"></div>
            <div className="h-4 bg-border-color/40 rounded-md w-4/5"></div>
        </div>
    );
};

export const HeroSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-pulse">
            <div className="space-y-6">
                <div className="w-36 h-8 bg-border-color/50 rounded-full"></div>
                <div className="h-12 bg-border-color/60 rounded-xl w-4/5"></div>
                <div className="h-12 bg-border-color/60 rounded-xl w-3/5"></div>
                <div className="h-16 bg-border-color/40 rounded-xl w-full"></div>
                <div className="h-14 bg-border-color/50 rounded-2xl w-full"></div>
            </div>
            <div className="h-80 bg-bg-card/80 border border-border-color/40 rounded-3xl"></div>
        </div>
    );
};

export const ImageSkeleton = ({ className = "w-full h-full" }) => {
    return (
        <div className={`bg-bg-surface/80 animate-pulse relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border-color/20 to-transparent animate-shimmer" />
        </div>
    );
};

export default {
    EventCardSkeleton,
    CardSkeleton,
    HeroSkeleton,
    ImageSkeleton,
};
