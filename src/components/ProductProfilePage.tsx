import React, {useEffect, useState} from "react";
import type {Product} from "../types/product.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGem, faLemon, faRuler, faRulerVertical} from '@fortawesome/free-solid-svg-icons';
import Badge from "./Badge.tsx";
import CollectionCard from "./CollectionCard.tsx";
import type {Collection} from "../types/collection.ts";
import {fetchCollectionsByIds} from "../services/collectionService.ts";
import {AppearanceGrid} from "./AppearanceGrid.tsx";
import {PersonalityPills} from "./PersonalityPills.tsx";
import {SectionCard} from "./SectionCard.tsx";
import {TagBadge} from "./TagBadge.tsx";
import {StatItem} from "./StatItem.tsx";
import {TimelineItem} from "./TimelineItem.tsx";
import {RelationshipNode} from "./RelationshipNode.tsx";
import {AccessoryItem} from "./AccessoryItem.tsx";
import {PreviousOwnerNote} from "./PreviousOwnerNote.tsx";
import {ExtraItem} from "./ExtraItem.tsx";
import {FullSizeImageModal} from "./FullSizeImageModal.tsx";

interface ProductProfilePageProps {
    product: Product;
}

const ProductProfilePage: React.FC<ProductProfilePageProps> = ({product}) => {

    const [showFullImage, setShowFullImage] = useState(false);
    const [useMetric, setUseMetric] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedPreference = localStorage.getItem('unitPreference');
            return savedPreference ? JSON.parse(savedPreference) : false;
        }
        return false;
    });

    const hasNoOwners = product.details?.previous_owners === 0;
    const hasExtras = product.details?.extras !== undefined && product.details.extras.length > 0;

    const [collections, setCollections] = useState<Collection[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const toggleUnitSystem = () => {
        const newPreference = !useMetric;
        setUseMetric(newPreference);
        localStorage.setItem('unitPreference', JSON.stringify(newPreference));
    };

    const formatHeight = () => {
        if (!product.details?.height) return "";
        return useMetric
            ? `${product.details.height.meters}`
            : `${product.details.height.feet}`;
    };

    // Format weight based on selected unit system
    const formatWeight = () => {
        if (!product.details?.weight) return "";
        return useMetric
            ? `${product.details.weight.kilograms}`
            : `${product.details.weight.pounds}`;
    };

    useEffect(() => {
        const loadData = async () => {
            try {

                if (product.collections === undefined)
                    return;

                const collections = await fetchCollectionsByIds(product.collections);

                if (collections === null)
                    return;

                setCollections(collections);
                setLoading(false);
            } catch {
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            }
        };

        loadData();
    }, [product.collections]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-gray-950 text-white px-6 py-4 rounded-xl shadow-lg animate-pulse">
                    <h1 className="text-2xl font-semibold">Loading products, please wait...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold">An error occurred while loading products.</h1>
                </div>
            </div>
        );
    }

    if (collections === undefined) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold">An error occurred while loading products.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] text-white rounded-4xl mt-4">
            <div className="block md:hidden w-full bg-black text-white rounded-t-4xl overflow-hidden relative">

                {/* Background with blur overlay */}
                <div
                    className="w-full bg-cover bg-center rounded-t-4xl"
                    style={{ backgroundImage: `url(${product.image})` }}
                >
                    <div className="w-full h-full bg-black/60 backdrop-blur-sm rounded-t-4xl">
                        <div className="relative z-10 flex flex-col items-center pt-6 px-4 pb-6">

                            {/* Flag in corner */}
                            <div className="w-full flex justify-end mb-2">
                                <img
                                    src={product.flag}
                                    alt="flag"
                                    className="w-8 h-5 border border-white rounded-sm"
                                />
                            </div>

                            {/* Avatar */}
                            <button
                                onClick={() => setShowFullImage(true)}
                                className="hover:ring-4 hover:ring-pink-500/30 transition-all rounded-full"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                                />
                            </button>

                            {/* Name & handle */}
                            <h1 className="mt-4 text-2xl font-semibold text-center">{product.name}</h1>
                            <p className="text-white/70 text-sm text-center">
                                @{product.name.toLowerCase().replace(/\s/g, '')}
                            </p>

                            {/* Profile Badges */}
                            {product.details?.profileBadges !== undefined && product.details.profileBadges.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-2">
                                    {product.details.profileBadges.map((badge, index) => (
                                        <TagBadge key={index} text={badge.text} color={badge.color} />
                                    ))}
                                </div>
                            )}

                            {/* Main badges */}
                            <div className="flex flex-wrap justify-center gap-3 mt-4">
                                {hasNoOwners && (
                                    <Badge
                                        text="FRESH PERSONA"
                                        bgColorClass="bg-amber-400"
                                        icon={<FontAwesomeIcon icon={faLemon} className="w-3 h-3" />}
                                        pulseBlur={true}
                                    />
                                )}
                                {hasExtras && (
                                    <Badge
                                        text="COMES WITH EXTRAS"
                                        bgColorClass="bg-indigo-600"
                                        icon={<FontAwesomeIcon icon={faGem} className="w-3 h-3" />}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block relative h-[200px] w-full bg-cover bg-center rounded-t-4xl"
                 style={{backgroundImage: `url(${product.image})`}}>
                <div className="absolute backdrop-blur-xl rounded-t-4xl inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end px-8 pb-6">
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4">
                        {hasNoOwners && (
                            <Badge
                                text="FRESH PERSONA"
                                bgColorClass="bg-amber-400"
                                icon={<FontAwesomeIcon icon={faLemon} className="w-3 h-3" />}
                                pulseBlur={true}
                            />
                        )}
                        {hasExtras &&
                            <Badge text="COMES WITH EXTRAS" bgColorClass="bg-indigo-600"
                                   icon={<FontAwesomeIcon icon={faGem} className="w-3 h-3" />}/>
                        }
                    </div>

                    <div className="flex items-end gap-6 w-full">
                        <div className="">
                            <button
                                onClick={() => setShowFullImage(true)}
                                className="cursor-pointer hover:ring-4 hover:ring-pink-500/30 transition-all rounded-full"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
                                />
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-4xl font-bold">{product.name}</h1>
                                    <p className="text-white/70 text-sm mt-1">@{product.name.toLowerCase().replace(/\s/g, '')}</p>
                                    <div className="flex gap-2 mt-2">
                                        {product.details?.profileBadges && product.details.profileBadges.map((badge, index) => (
                                            <TagBadge key={index} text={badge.text} color={badge.color}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex hidden gap-4 mb-2">
                                    <button
                                        className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-sm font-medium transition">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={product.flag} className="absolute top-4 right-4 w-10 h-6 border border-white rounded-sm"
                     alt="flag"/>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/5 space-y-6">
                        {product.details &&
                            <SectionCard title="Profile Stats">
                                <div className="flex justify-end mb-3">
                                    <button
                                        onClick={toggleUnitSystem}
                                        className="flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <FontAwesomeIcon icon={useMetric ? faRuler : faRulerVertical} />
                                        {useMetric ? 'METRIC' : 'IMPERIAL'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {product.details?.age && <StatItem value={product.details.age.toString()} label="Age"/>}
                                    {product.details?.height &&
                                        <StatItem value={formatHeight()} label="Height"/>}
                                    {product.details?.weight &&
                                        <StatItem value={formatWeight()} label="Weight"/>}
                                    {product.details?.biometry && <StatItem value={product.details.biometry} label="Biometry"/>}
                                    {product.details?.maxWear && <StatItem value={product.details.maxWear} label="Max Wear"/>}
                                    {product.details?.condition && <StatItem value={product.details.condition} label="Condition"/>}
                                    {product.details?.background && <StatItem className={'col-span-full'} textSize={'lg'} value={product.details.background} label="Background"/>}
                                    {product.details?.sexual_preference && <StatItem className={'col-span-full'} textSize={'lg'} value={product.details.sexual_preference} label="Sexual Preference"/>}
                                    {product.details?.pussy_type && <StatItem className={'col-span-full'} textSize={'lg'} value={product.details.pussy_type} label="Pussy type"/>}
                                </div>
                            </SectionCard>
                        }

                        <SectionCard title="Ownership">
                            <div className="space-y-4">
                                {product.details?.previous_owners !== undefined && product.details?.previous_owners !== 0 &&
                                    <div>
                                        <p className="text-sm text-white/60 uppercase tracking-wider">Previous
                                            Owners</p>
                                        <p className="font-medium">{product.details.previous_owners}</p>
                                    </div>
                                }
                                <div>
                                    <p className="text-sm text-white/60 uppercase tracking-wider">Current Value</p>
                                    <p className="text-2xl font-bold text-pink-400">{product.price}</p>
                                </div>
                            </div>
                        </SectionCard>

                        {product.details?.previousOwnerNote && product.details.previous_owners > 0 && (
                            <PreviousOwnerNote note={product.details.previousOwnerNote}/>
                        )}

                        {product.details?.familyRelationships &&
                            <SectionCard title="Key Relationships">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.details.familyRelationships.map((person, index) => (
                                        <RelationshipNode key={index} name={person.name} relation={person.relation}
                                                          status={person.status}/>
                                    ))}
                                </div>
                            </SectionCard>
                        }
                        {
                            product.details?.accessories &&
                            <SectionCard title="Accessories">
                                <div className="space-y-3">
                                    {product.details.accessories.map((accessory, index) => (
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
                        }

                        {collections && collections.length > 0 && (
                            <SectionCard title="Featured in Collections">
                                <div className="flex flex-wrap gap-4">
                                    {collections.map((collection, index) => (
                                        <CollectionCard key={index} collection={collection} />
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                    </div>

                    <div className="lg:w-2/3 space-y-6">
                        <SectionCard title="About">
                            <p className="text-white/80 leading-relaxed">
                                {product.description}
                            </p>
                        </SectionCard>

                        {product.details?.quotes && product.details.quotes.length > 0 && (
                            <SectionCard title="Quotes">
                                <div className="space-y-4">
                                    {product.details.quotes.map((quote, index) => (
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
                        )}

                        {product.details?.appearance && (
                            <SectionCard title="Physical Appearance">
                                <AppearanceGrid items={product.details.appearance} />
                            </SectionCard>
                        )}

                        {product.details?.personality && (
                            <SectionCard title="Personality Traits">
                                <PersonalityPills traits={product.details.personality} />
                            </SectionCard>
                        )}

                        {product.details?.extras &&
                            <SectionCard title="Premium Extras">
                                <div className="space-y-4">
                                    {product.details.extras.map((extra, index) => (
                                        <ExtraItem
                                            key={index}
                                            name={extra.name}
                                            description={extra.description}
                                            value={extra.value}
                                            exclusive={extra.exclusive}
                                        />
                                    ))}
                                </div>
                            </SectionCard>
                        }
                        
                        {product.details?.exploitationScenarios &&
                            <SectionCard title="Exploitation Scenarios">
                                <div className="space-y-4">
                                    {product.details.exploitationScenarios.map((scenario, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-base mb-1">{scenario.title}</h4>
                                                <p className="text-white/80 text-sm">{scenario.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        }
                        {product.details?.personaHistory &&
                            <SectionCard title="Persona Timeline">
                                <div className="space-y-2">
                                    {product.details.personaHistory.map((item, index) => (
                                        <TimelineItem key={index} date={item.date} title={item.title}
                                                      description={item.description}/>
                                    ))}
                                </div>
                            </SectionCard>
                        }

                        {
                            product.details?.advancedFeatures &&
                            <SectionCard title="Advanced Features">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.details.advancedFeatures.map((feature, index) => (
                                        <div key={index}>
                                            <p className="text-sm text-white/60 uppercase tracking-wider">{feature.title}</p>
                                            <p className="font-medium">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        }

                        { product.details?.kinks &&
                            <SectionCard title="Kinks & Fetishes">
                                <div className="flex flex-wrap gap-2">
                                    {product.details.kinks.map((kink, index) => (
                                        <TagBadge key={index} text={kink.text} color={kink.color}/>
                                    ))}
                                </div>
                            </SectionCard>
                        }
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <button
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-all shadow-lg transform hover:scale-105">
                        Purchase Now · {product.price}
                    </button>
                    <p className="text-white/60 text-sm mt-3">30-day satisfaction guarantee · Discreet worldwide
                        shipping</p>
                    <div className="mt-4 text-xs text-white/40">
                        <p>By purchasing, you certify that you understand this item was molded in the likeness of a once-living person.</p>
                    </div>
                </div>
            </div>
            {showFullImage && (
                <FullSizeImageModal
                    imageUrl={product.image}
                    onClose={() => setShowFullImage(false)}
                />)
            }
        </div>
    );
};

export default ProductProfilePage;