import { SectionCard } from "./SectionCard.tsx";
import { AccessoryItem } from "./AccessoryItem.tsx";
import type {Product} from "../../types/product.ts";

interface AccessoriesSectionProps {
    accessories: NonNullable<Product["details"]>["accessories"];
}

export const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({
                                                                          accessories,
                                                                      }) => (
    <SectionCard title="Accessories">
        <div className="space-y-3">
            {accessories !== undefined && accessories.map((accessory, index) => (
                <AccessoryItem
                    key={index}
                    name={accessory.name}
                    type={accessory.type}
                    description={accessory.description}
                    price={accessory.price}
                    included={accessory.included}
                />
            ))}
        </div>
    </SectionCard>
);