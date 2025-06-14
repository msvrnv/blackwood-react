// In ProductProfilePage.tsx
import React, {useEffect, useState} from "react";
import type {Product} from "../types/product.ts";
import {LoadingState} from "./LoadingState.tsx";
import {ErrorState} from "./ErrorState.tsx";
import {FullSizeImageModal} from "./product-profile-sections/FullSizeImageModal.tsx";
import type {Collection} from "../types/collection.ts";
import {fetchCollectionsByIds} from "../services/collectionService.ts";
import {ProfileStatsSection} from "./product-profile-sections/ProfileStatsSection.tsx";
import {PreviousOwnerNote} from "./product-profile-sections/PreviousOwnerNote.tsx";
import {MobileProfileHeader} from "./product-profile-sections/MobileProfileHeader.tsx";
import {DesktopProfileHeader} from "./product-profile-sections/DesktopProfileHeader.tsx";
import {RelationshipsSection} from "./product-profile-sections/RelationshipsSection.tsx";
import {CollectionsSection} from "./product-profile-sections/CollectionsSection.tsx";
import {AccessoriesSection} from "./product-profile-sections/AccessoriesSection.tsx";
import {AboutSection} from "./product-profile-sections/AboutSection.tsx";
import {QuotesSection} from "./product-profile-sections/QuotesSection.tsx";
import {AppearanceSection} from "./product-profile-sections/AppearanceSection.tsx";
import {PersonalitySection} from "./product-profile-sections/PersonalitySection.tsx";
import {ExtrasSection} from "./product-profile-sections/ExtrasSection.tsx";
import {ScenariosSection} from "./product-profile-sections/ScenariosSection.tsx";
import {TimelineSection} from "./product-profile-sections/TimelineSection.tsx";
import {FeaturesSection} from "./product-profile-sections/FeaturesSection.tsx";
import {KinksSection} from "./product-profile-sections/KinksSection.tsx";
import {PurchaseSection} from "./product-profile-sections/PurchaseSectionProps.tsx";
import {OwnershipSection} from "./product-profile-sections/OwnershipSection.tsx";
import { QuestionsAndAnswersModal } from "./product-profile-sections/QuestionsAndAnswersModal.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface ProductProfilePageProps {
    product: Product;
}

const ProductProfilePage: React.FC<ProductProfilePageProps> = ({product}) => {
    const [showFullImage, setShowFullImage] = useState(false);
    const [showQandA, setShowQandA] = useState(false);
    const [useMetric, setUseMetric] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedPreference = localStorage.getItem('unitPreference');
            return savedPreference ? JSON.parse(savedPreference) : false;
        }
        return false;
    });

    const hasNoOwners = product.details?.previous_owners === 0;
    const hasExtras = product.details?.extras !== undefined && product.details.extras.length > 0;
    const hasQandA = product.details?.questions_and_answers && product.details.questions_and_answers.length > 0;

    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const toggleUnitSystem = () => {
        const newPreference = !useMetric;
        setUseMetric(newPreference);
        localStorage.setItem('unitPreference', JSON.stringify(newPreference));
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                if (product.collections === undefined) return;
                const collections = await fetchCollectionsByIds(product.collections);
                if (collections === null) return;
                setCollections(collections);
                setLoading(false);
            } catch {
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            }
        };
        loadData();
    }, [product.collections]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (collections === undefined) return <ErrorState message="An error occurred while loading products." />;

    return (
        <div className="bg-[#121212] text-white rounded-4xl mt-4">
            {/* Mobile Header */}
            <MobileProfileHeader
                product={product}
                hasNoOwners={hasNoOwners}
                hasExtras={hasExtras}
                onImageClick={() => setShowFullImage(true)}
            />

            {/* Desktop Header */}
            <DesktopProfileHeader
                product={product}
                hasNoOwners={hasNoOwners}
                hasExtras={hasExtras}
                onImageClick={() => setShowFullImage(true)}
            />

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/5 space-y-6">
                        {product.details && (
                            <ProfileStatsSection
                                details={product.details}
                                useMetric={useMetric}
                                onToggleUnit={toggleUnitSystem}
                            />
                        )}

                        {hasQandA && (
                            <button
                                onClick={() => setShowQandA(true)}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-pink-900/30 hover:bg-pink-900/40 border border-pink-900/50 rounded-lg transition-colors"
                            >
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span>View Q&A</span>
                            </button>
                        )}

                        <OwnershipSection
                            previousOwners={product.details?.previous_owners}
                            price={product.price}
                        />

                        {product.details?.previousOwnerNote && product.details.previous_owners > 0 && (
                            <PreviousOwnerNote note={product.details.previousOwnerNote}/>
                        )}

                        {product.details?.familyRelationships && (
                            <RelationshipsSection relationships={product.details.familyRelationships} />
                        )}

                        {product.details?.accessories && (
                            <AccessoriesSection accessories={product.details.accessories} />
                        )}

                        {collections && collections.length > 0 && (
                            <CollectionsSection collections={collections} />
                        )}
                    </div>

                    <div className="lg:w-2/3 space-y-6">
                        <AboutSection description={product.description} />

                        {product.details?.quotes && product.details.quotes.length > 0 && (
                            <QuotesSection quotes={product.details.quotes} />
                        )}

                        {product.details?.appearance && (
                            <AppearanceSection appearance={product.details.appearance} />
                        )}

                        {product.details?.personality && (
                            <PersonalitySection traits={product.details.personality} />
                        )}

                        {product.details?.extras && (
                            <ExtrasSection extras={product.details.extras} />
                        )}

                        {product.details?.exploitationScenarios && (
                            <ScenariosSection scenarios={product.details.exploitationScenarios} />
                        )}

                        {product.details?.personaHistory && (
                            <TimelineSection items={product.details.personaHistory} />
                        )}

                        {product.details?.advancedFeatures && (
                            <FeaturesSection features={product.details.advancedFeatures} />
                        )}

                        {product.details?.kinks && (
                            <KinksSection kinks={product.details.kinks} />
                        )}
                    </div>
                </div>

                <PurchaseSection price={product.price} />
            </div>

            {showFullImage && (
                <FullSizeImageModal
                    imageUrl={product.image}
                    onClose={() => setShowFullImage(false)}
                />
            )}

            {product.details?.questions_and_answers !== undefined && (
                <QuestionsAndAnswersModal
                    personName={product.name}
                    items={product.details.questions_and_answers}
                    picture={product.image}
                    isOpen={showQandA}
                    onClose={() => setShowQandA(false)}
                />
            )}
        </div>
    );
};

export default ProductProfilePage;