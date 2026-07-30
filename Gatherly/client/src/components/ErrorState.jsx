import React from 'react';
import { motion } from 'framer-motion';

const PRESETS = {
    'failed-load': {
        title: 'Failed to Load Events',
        description: 'We encountered an error while retrieving the event details. Please check your connection and try again.',
        icon: '⚠️'
    },
    'network-error': {
        title: 'Network Error',
        description: 'Unable to reach the Gatherly servers. Please check your internet connection and try again.',
        icon: '📡'
    },
    'generic-error': {
        title: 'Something Went Wrong',
        description: 'An unexpected error occurred while processing your request. Please try refreshing the page.',
        icon: '💥'
    }
};

const ErrorState = ({
    type = 'generic-error',
    title,
    description,
    onRetry,
    className = ''
}) => {
    const preset = PRESETS[type] || PRESETS['generic-error'];
    const displayTitle = title || preset.title;
    const displayDesc = description || preset.description;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center justify-center p-8 text-center bg-error/5 border border-error/20 rounded-3xl max-w-xl mx-auto my-8 ${className}`}
        >
            <div className="w-16 h-16 rounded-2xl bg-error/10 border border-error/30 flex items-center justify-center text-3xl mb-4">
                {preset.icon}
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2 font-heading">
                {displayTitle}
            </h3>

            <p className="text-text-muted text-sm max-w-md mb-6 leading-relaxed">
                {displayDesc}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-error/20 hover:bg-error/30 text-red-300 border border-error/40 font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2"
                >
                    <span className="text-base">🔄</span> Try Again
                </button>
            )}
        </motion.div>
    );
};

export default ErrorState;
