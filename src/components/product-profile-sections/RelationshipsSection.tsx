import { SectionCard } from "./SectionCard.tsx";
import { RelationshipNode } from "./RelationshipNode.tsx";
import type {Product} from "../../types/product.ts";

interface RelationshipsSectionProps {
    relationships: NonNullable<Product["details"]>["familyRelationships"];
}

export const RelationshipsSection: React.FC<RelationshipsSectionProps> = ({
                                                                              relationships,
                                                                          }) => (
    <SectionCard title="Key Relationships">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relationships !== undefined && relationships.map((person, index) => (
                <RelationshipNode
                    key={index}
                    name={person.name}
                    relation={person.relation}
                    status={person.status}
                />
            ))}
        </div>
    </SectionCard>
);