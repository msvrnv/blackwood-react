import React from "react";
import {SectionCard} from "./SectionCard.tsx";

export const PreviousOwnerNote: React.FC<{ note: string }> = ({note}) => (
    <SectionCard title="Previous Owner Notes">
        <div className="p-4 bg-black/30 border border-pink-900/50 rounded-lg">
            <div className="flex items-start gap-3">
                <div className="text-pink-400 text-xl">"</div>
                <p className="text-white/80 italic">{note}</p>
                <div className="text-pink-400 text-xl self-end">"</div>
            </div>
        </div>
    </SectionCard>
);