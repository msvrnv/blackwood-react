import { SectionCard } from "./SectionCard.tsx";
import { TimelineItem } from "./TimelineItem.tsx";
import type {Product} from "../../types/product.ts";

interface TimelineSectionProps {
    items: NonNullable<Product["details"]>["personaHistory"];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ items }) => (
    <SectionCard title="Persona Timeline">
        <div className="space-y-2">
            {items !== undefined && items.map((item, index) => (
                <TimelineItem
                    key={index}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </div>
    </SectionCard>
);