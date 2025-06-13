import React from "react";

export const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({title, children}) => (
    <div className="bg-[#1f1f1f]/80 rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wider">{title}</h3>
        <div className="text-white/90 space-y-3">{children}</div>
    </div>
);