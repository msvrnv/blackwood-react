import { SectionCard } from "./SectionCard.tsx";
import type { Collection } from "../../types/collection.ts";
import CollectionCard from "../CollectionCard.tsx";

interface CollectionsSectionProps {
    collections: Collection[];
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
                                                                          collections,
                                                                      }) => (
    <SectionCard title="Featured in Collections">
        <div className="flex flex-wrap gap-4">
            {collections.map((collection, index) => (
                <CollectionCard key={index} collection={collection} />
            ))}
        </div>
    </SectionCard>
);