import React from "react";

export const AppearanceGrid: React.FC<{ items: string[] }> = ({items}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {items.map((item, index) => (
                <div key={index}
                     className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-pink-500/20 transition-colors">
                    <div className="text-pink-400 text-xs mt-0.5">•</div>
                    <span className="text-white/90 text-sm">{item}</span>
                </div>
            ))}
        </div>
    );
};