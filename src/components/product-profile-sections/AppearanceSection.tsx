import { SectionCard } from "./SectionCard.tsx";
import { AppearanceGrid } from "./AppearanceGrid.tsx";

interface AppearanceSectionProps {
    appearance: string[];
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
                                                                        appearance,
                                                                    }) => (
    <SectionCard title="Physical Appearance">
        <AppearanceGrid items={appearance} />
    </SectionCard>
);