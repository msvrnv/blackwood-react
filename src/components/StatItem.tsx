import React from "react";

export const StatItem: React.FC<{
    value: string;
    label: string;
    className?: string;
    textSize?: '2xl' | 'xl' | 'base' | 'lg' | 'sm';
    subtextSize?: '2xl' | 'xl' | 'sm' | 's' | 'xs'
}> = ({value, label, className, textSize = '2xl', subtextSize = 'xs'}) => (
    <div className={`flex flex-col items-center p-3 bg-white/5 rounded-lg ${className}`}>
        <span className={`text-${textSize} text-center font-bold text-white`}>{value}</span>
        <span className={`text-${subtextSize} text-white/60 uppercase tracking-wider`}>{label}</span>
    </div>
);