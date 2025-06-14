import {SectionCard} from "./SectionCard.tsx";

interface AboutSectionProps {
    description: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({description}) => (
    <SectionCard title="About">
        <p className="text-white/80 leading-relaxed">
            {description}
        </p>
    </SectionCard>
);