// Badge.tsx
import React from "react";

interface BadgeProps {
    text?: string;
    bgColorClass?: string;
    icon?: React.ReactNode;
    pulseBlur?: boolean;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
                                         text,
                                         bgColorClass = "bg-amber-400",
                                         icon,
                                         pulseBlur = false,
                                         className = "",
                                     }) => {
    return (
        <div className={`relative inline-block ${className}`}>
            <div
                className={`${bgColorClass} text-black px-4 py-1 rounded-full font-bold text-xs whitespace-nowrap shadow-lg flex items-center select-none`}
            >
                {icon && <span className="mr-1">{icon}</span>}
                {text}
            </div>
            {pulseBlur && (
                <div className={`${bgColorClass} rounded-full blur-sm opacity-60 absolute inset-0 -z-10 animate-pulse`} />
            )}
        </div>
    );
};

export default Badge;
