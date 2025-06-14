import { SectionCard } from "./SectionCard.tsx";
import type {Product} from "../../types/product.ts";

interface ScenariosSectionProps {
    scenarios: NonNullable<Product["details"]>["exploitationScenarios"];
}

export const ScenariosSection: React.FC<ScenariosSectionProps> = ({
                                                                      scenarios,
                                                                  }) => (
    <SectionCard title="Exploitation Scenarios">
        <div className="space-y-4">
            {scenarios !== undefined && scenarios.map((scenario, index) => (
                <div key={index} className="flex items-start">
                    <div className="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        {index + 1}
                    </div>
                    <div>
                        <h4 className="text-white font-semibold text-base mb-1">
                            {scenario.title}
                        </h4>
                        <p className="text-white/80 text-sm">{scenario.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </SectionCard>
);