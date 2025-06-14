import {SectionCard} from "./SectionCard.tsx";

interface QuotesSectionProps {
    quotes: string[];
}

export const QuotesSection: React.FC<QuotesSectionProps> = ({quotes}) => (
    <SectionCard title="Quotes">
        <div className="space-y-4">
            {quotes.map((quote, index) => (
                <div key={index} className="p-4 bg-black/30 border border-pink-900/50 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="text-pink-400 text-xl">"</div>
                        <p
                            className="text-white/80 italic"
                            dangerouslySetInnerHTML={{ __html: quote }}
                        />
                        <div className="text-pink-400 text-xl self-end">"</div>
                    </div>
                </div>
            ))}
        </div>
    </SectionCard>
);