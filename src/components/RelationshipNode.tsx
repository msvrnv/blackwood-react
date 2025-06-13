import React from "react";

export const RelationshipNode: React.FC<{ name: string; relation: string; status?: string }> = ({
                                                                                                    name,
                                                                                                    relation,
                                                                                                    status
                                                                                                }) => (
    <div className="bg-[#2a2a2a] p-3 rounded-lg border border-white/10">
        <div className="font-bold text-white">{name}</div>
        <div className="text-xs text-pink-400 uppercase">{relation}</div>
        {status && <div className="text-xs mt-1 text-white/50 italic">{status}</div>}
    </div>
);