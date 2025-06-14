import { SectionCard } from "./SectionCard.tsx";
import { PreviousOwnerNote } from "./PreviousOwnerNote.tsx";

interface OwnershipSectionProps {
    previousOwners?: number;
    price: string;
    previousOwnerNote?: string;
}

export const OwnershipSection: React.FC<OwnershipSectionProps> = ({
                                                                      previousOwners,
                                                                      price,
                                                                      previousOwnerNote,
                                                                  }) => (
    <>
        <SectionCard title="Ownership">
            <div className="space-y-4">
                {previousOwners !== undefined && previousOwners !== 0 && (
                    <div>
                        <p className="text-sm text-white/60 uppercase tracking-wider">
                            Previous Owners
                        </p>
                        <p className="font-medium">{previousOwners}</p>
                    </div>
                )}
                <div>
                    <p className="text-sm text-white/60 uppercase tracking-wider">
                        Current Value
                    </p>
                    <p className="text-2xl font-bold text-pink-400">{price}</p>
                </div>
            </div>
        </SectionCard>

        {previousOwnerNote && previousOwners && previousOwners > 0 && (
            <PreviousOwnerNote note={previousOwnerNote} />
        )}
    </>
);