import React from 'react';

type BadgeVariant = 'tamagui' | 'custom';

interface ComponentBadgeProps {
    variant: BadgeVariant;
    className?: string;
}

/**
 * Component origin badge - indicates whether a component is from Tamagui or custom-built
 */
export function ComponentBadge({ variant, className = '' }: ComponentBadgeProps) {
    const baseStyles = 'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider';

    const variantStyles = {
        tamagui: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
        custom: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    };

    return (
        <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {variant}
        </span>
    );
}

export default ComponentBadge;
