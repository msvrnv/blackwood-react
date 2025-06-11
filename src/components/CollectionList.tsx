import React from "react";
import { Link } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import type {Collection} from "../types/collection.ts";

interface CollectionListProps {
    collections: Collection[];
}

const CollectionList: React.FC<CollectionListProps> = ({ collections }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {collections.map((collection, idx) => (
                <Link
                    to={`/collections/${collection.id}`}
                    key={idx}
                    className="block hover:shadow-lg transition-shadow duration-200"
                >
                    <CollectionCard collection={collection} />
                </Link>
            ))}
        </div>
    );
};

export default CollectionList;