import React from 'react';
import { motion } from 'framer-motion';

const PRESETS = {
    'no-events': {
        icon: '🎭',
        title: 'No Events Found',
        description: 'There are currently no events available in this section. Check back later or create one!',
        actionText: 'Clear Filters'
    },
    'no-search-results': {
        icon: '🔍',
        title: 'Search Returned No Results',
        description: 'We couldn’t find any events matching your search terms or filters. Try adjusting your query.',
        actionText: 'Reset Search'
    },
    'no-upcoming': {
        icon: '📅',
        title: 'No Upcoming Events',
        description: 'You don’t have any upcoming events scheduled right now. Explore the event catalog to join!',
        actionText: 'Browse Events'
    },
    'no-registered': {
        icon: '🎟️',
        title: 'No Registered Events',
        description: 'You haven’t registered for any events yet. Reserve your spot for exciting campus events today.',
        actionText: 'Explore Events'
    }
};

const EmptyState = ({
    type = 'no-events',
    title,
    description,
    icon,
    actionText,
    onAction
}) => {
    const preset = PRESETS[type] || PRESETS['no-events'];
    const displayTitle = title || preset.title;
    const displayDesc = description || preset.description;
    const displayIcon = icon || preset.icon;
    const displayActionText = actionText || preset.actionText;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center bg-bg-card/40 border border-border-color/60 rounded-3xl backdrop-blur-sm my-6 max-w-2xl mx-auto"
        >
            <div className="w-20 h-20 rounded-2xl bg-bg-surface border border-primary/20 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-primary/5">
                {displayIcon}
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-2 font-heading">
                {displayTitle}
            </h3>

            <p className="text-text-muted text-sm md:text-base max-w-md mb-8 leading-relaxed">
                {displayDesc}
            </p>

            {onAction && (
                <button
                    onClick={onAction}
                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/60 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-sm"
                >
                    {displayActionText}
                </button>
            )}
        </motion.div>
    );
};

export default EmptyState;
