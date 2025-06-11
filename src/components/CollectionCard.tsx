import React from "react";
import type { Collection } from "../types/collection.ts";

interface CollectionCardProps {
    collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
    return (
        <div className="flex flex-col md:flex-row h-full bg-[#1a1a1a] text-white border border-[#666] rounded-2xl overflow-hidden p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_#6666] min-w-[220px]">
            <div className="w-[128px] h-[128px] flex-shrink-0 rounded-xl overflow-hidden mx-auto mb-4 md:mx-0 md:mb-0 md:mr-4">
                {collection.icon ? (
                    <img src={collection.icon} alt={`${collection.name} icon`} className="w-full h-full object-cover" />
                ) : null}
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-xl font-medium uppercase mb-2">{collection.name}</h2>
                <p className="text-sm italic text-[#ddd]">{collection.description}</p>
            </div>
        </div>
    );
};

export default CollectionCard;
