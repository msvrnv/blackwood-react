import { SectionCard } from "./SectionCard.tsx";
import { TagBadge } from "./TagBadge.tsx";
import type {Product} from "../../types/product.ts";

interface KinksSectionProps {
    kinks: NonNullable<Product["details"]>["kinks"];
}

export const KinksSection: React.FC<KinksSectionProps> = ({ kinks }) => (
    <SectionCard title="Kinks & Fetishes">
        <div className="flex flex-wrap gap-2">
            {kinks !== undefined && kinks.map((kink, index) => (
                <TagBadge key={index} text={kink.text} color={kink.color} />
            ))}
        </div>
    </SectionCard>
);