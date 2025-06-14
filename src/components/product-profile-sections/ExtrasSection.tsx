import { SectionCard } from "./SectionCard.tsx";
import { ExtraItem } from "./ExtraItem.tsx";
import type {Product} from "../../types/product.ts";

interface ExtrasSectionProps {
    extras: NonNullable<Product["details"]>["extras"];
}

export const ExtrasSection: React.FC<ExtrasSectionProps> = ({ extras }) => (
    <SectionCard title="Premium Extras">
        <div className="space-y-4">
            {extras !== undefined && extras.map((extra, index) => (
                <ExtraItem
                    key={index}
                    name={extra.name}
                    description={extra.description}
                    value={extra.value}
                    exclusive={extra.exclusive}
                />
            ))}
        </div>
    </SectionCard>
);