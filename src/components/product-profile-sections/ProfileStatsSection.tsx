// ProfileStatsSection.tsx
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRuler, faRulerVertical} from '@fortawesome/free-solid-svg-icons';
import {StatItem} from "./StatItem.tsx";
import {SectionCard} from "./SectionCard.tsx";
import type {Product} from "../../types/product.ts";

interface ProfileStatsSectionProps {
    details: NonNullable<Product>["details"];
    useMetric: boolean;
    onToggleUnit: () => void;
}

const formatHeight = (height: NonNullable<Product["details"]>["height"] | undefined, useMetric: boolean) => {
    if (!height) return "";
    return useMetric ? `${height.meters}` : `${height.feet}`;
};

const formatWeight = (weight: NonNullable<Product["details"]>["weight"] | undefined, useMetric: boolean) => {
    if (!weight) return "";
    return useMetric ? `${weight.kilograms}` : `${weight.pounds}`;
};

export const ProfileStatsSection: React.FC<ProfileStatsSectionProps> = ({
                                                                            details,
                                                                            useMetric,
                                                                            onToggleUnit
                                                                        }) => {
    return (
        <SectionCard title="Profile Stats">
            <div className="flex justify-end mb-3">
                <button
                    onClick={onToggleUnit}
                    className="flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                >
                    <FontAwesomeIcon icon={useMetric ? faRuler : faRulerVertical} />
                    {useMetric ? 'METRIC' : 'IMPERIAL'}
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {details?.age && <StatItem value={details.age.toString()} label="Age"/>}
                {details?.height && <StatItem value={formatHeight(details.height, useMetric)} label="Height"/>}
                {details?.weight && <StatItem value={formatWeight(details.weight, useMetric)} label="Weight"/>}
                {details?.biometry && <StatItem value={details.biometry} label="Biometry"/>}
                {details?.maxWear && <StatItem value={details.maxWear} label="Max Wear"/>}
                {details?.condition && <StatItem value={details.condition} label="Condition"/>}
                {details?.background && (
                    <StatItem
                        className="col-span-full"
                        textSize="lg"
                        value={details.background}
                        label="Background"
                    />
                )}
                {details?.sexual_preference && (
                    <StatItem
                        className="col-span-full"
                        textSize="lg"
                        value={details.sexual_preference}
                        label="Sexual Preference"
                    />
                )}
                {details?.pussy_type && (
                    <StatItem
                        className="col-span-full"
                        textSize="lg"
                        value={details.pussy_type}
                        label="Pussy type"
                    />
                )}
            </div>
        </SectionCard>
    );
};