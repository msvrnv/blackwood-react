import { SectionCard } from "./SectionCard.tsx";
import { PersonalityPills } from "./PersonalityPills.tsx";

interface PersonalitySectionProps {
    traits: string[];
}

export const PersonalitySection: React.FC<PersonalitySectionProps> = ({
                                                                          traits,
                                                                      }) => (
    <SectionCard title="Personality Traits">
        <PersonalityPills traits={traits} />
    </SectionCard>
);