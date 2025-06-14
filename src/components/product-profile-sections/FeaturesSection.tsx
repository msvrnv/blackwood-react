import { SectionCard } from "./SectionCard.tsx";
import type {Product} from "../../types/product.ts";

interface FeaturesSectionProps {
    features: NonNullable<Product["details"]>["advancedFeatures"];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
                                                                    features,
                                                                }) => (
    <SectionCard title="Advanced Features">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features !== undefined && features.map((feature, index) => (
                <div key={index}>
                    <p className="text-sm text-white/60 uppercase tracking-wider">
                        {feature.title}
                    </p>
                    <p className="font-medium">{feature.description}</p>
                </div>
            ))}
        </div>
    </SectionCard>
);