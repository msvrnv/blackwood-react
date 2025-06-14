import React from "react";

export const TimelineItem: React.FC<{ date: string; title: string; description: string }> = ({
                                                                                                 date,
                                                                                                 title,
                                                                                                 description
                                                                                             }) => (
    <div className="relative pl-8 pb-6 border-l-2 border-pink-500/30 last:border-l-0 last:pb-0">
        <div className="absolute w-4 h-4 rounded-full bg-pink-500 -left-2 top-0.5"></div>
        <div className="text-xs text-pink-400 font-mono">{date}</div>
        <h4 className="font-bold text-white mt-1">{title}</h4>
        <p className="text-white/70 text-sm mt-1">{description}</p>
    </div>
);