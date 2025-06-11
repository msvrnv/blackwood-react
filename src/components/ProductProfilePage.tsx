import React, {useEffect, useState} from "react";
import type {Product} from "../types/product.ts";
import {faTooth} from "@fortawesome/free-solid-svg-icons/faTooth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {faBoxOpen, faBolt, faCoins, faCrown, faLemon, faGem, faTimes} from '@fortawesome/free-solid-svg-icons';
import Badge from "./Badge.tsx";
import CollectionCard from "./CollectionCard.tsx";
import type {Collection} from "../types/collection.ts";
import {fetchCollectionsByIds} from "../services/collectionService.ts";


const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({title, children}) => (
    <div className="bg-[#1f1f1f]/80 rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wider">{title}</h3>
        <div className="text-white/90 space-y-3">{children}</div>
    </div>
);

const TagBadge: React.FC<{ text: string; color?: string }> = ({text, color = "white"}) => {
    return (
        <span className={`text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm`} style={{ backgroundColor: color }}>
            {text}
        </span>
    );
};

const StatItem: React.FC<{ value: string; label: string }> = ({value, label}) => (
    <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-xs text-white/60 uppercase tracking-wider">{label}</span>
    </div>
);

const TimelineItem: React.FC<{ date: string; title: string; description: string }> = ({date, title, description}) => (
    <div className="relative pl-8 pb-6 border-l-2 border-pink-500/30 last:border-l-0 last:pb-0">
        <div className="absolute w-4 h-4 rounded-full bg-pink-500 -left-2 top-0.5"></div>
        <div className="text-xs text-pink-400 font-mono">{date}</div>
        <h4 className="font-bold text-white mt-1">{title}</h4>
        <p className="text-white/70 text-sm mt-1">{description}</p>
    </div>
);

const RelationshipNode: React.FC<{ name: string; relation: string; status?: string }> = ({name, relation, status}) => (
    <div className="bg-[#2a2a2a] p-3 rounded-lg border border-white/10">
        <div className="font-bold text-white">{name}</div>
        <div className="text-xs text-pink-400 uppercase">{relation}</div>
        {status && <div className="text-xs mt-1 text-white/50 italic">{status}</div>}
    </div>
);

const AccessoryItem: React.FC<{
    name: string;
    type: string;
    description: string;
    price: string;
    included: boolean;
}> = ({name, type, description, price, included}) => {
    const getIcon = () => {
        switch (type.toLowerCase()) {
            case 'dentures':
                return faTooth;
            case 'lenses':
                return faEye;
            default:
                return faBoxOpen;
        }
    };

    return (
        <div
            className="flex items-start gap-4 p-4 bg-[#2a2a2a] rounded-lg border border-white/10 hover:border-pink-500/50 transition-colors">
            <div className="text-2xl w-[30px]">
                <FontAwesomeIcon icon={getIcon()} className="text-pink-400"/>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white">{name}</h4>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${included ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                        {included ? 'INCLUDED' : `+${price}`}
                    </span>
                </div>
                <p className="text-xs text-white/60 uppercase mt-1">{type}</p>
                <p className="text-sm text-white/80 mt-2">{description}</p>
            </div>
        </div>
    );
};

const PreviousOwnerNote: React.FC<{ note: string }> = ({note}) => (
    <SectionCard title="Previous Owner Notes">
        <div className="p-4 bg-black/30 border border-pink-900/50 rounded-lg">
            <div className="flex items-start gap-3">
                <div className="text-pink-400 text-xl">"</div>
                <p className="text-white/80 italic">{note}</p>
                <div className="text-pink-400 text-xl self-end">"</div>
            </div>
        </div>
    </SectionCard>
);

interface ProductProfilePageProps {
    product: Product;
}

const ExtraItem: React.FC<{
    name: string;
    description: string;
    value: string;
    exclusive: boolean;
}> = ({name, description, value, exclusive}) => {
    return (
        <div className="group relative flex items-start gap-4 p-4 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-white/5 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faBolt} className="w-5 h-5 text-pink-400" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-white">{name}</h4>
                    {exclusive && (
                        <span className="text-xs bg-gradient-to-r from-amber-400/20 to-amber-600/20 text-amber-400 px-2 py-1 rounded-full flex items-center gap-1">
                            <FontAwesomeIcon icon={faCrown} className="w-3 h-3" />
                            EXCLUSIVE
                        </span>
                    )}
                </div>

                <p className="text-sm text-white/80 mt-1 mb-3">{description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-white/50 mb-1">VALUE ESTIMATE</span>
                        <div className="px-3 py-2 bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/20 rounded-lg flex items-center gap-2">
                            <FontAwesomeIcon icon={faCoins} className="w-3 h-3 text-amber-400" />
                            <span className="text-sm font-mono font-medium text-white">
                                {value}
                            </span>
                        </div>
                    </div>
                    {exclusive && (
                        <span className="text-xs text-amber-400/70 self-end mb-1">Limited availability</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const FullSizeImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="relative max-w-4xl w-full max-h-[90vh]">
                <img
                    src={imageUrl}
                    alt="Full size profile"
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>
        </div>
    );
};



const ProductProfilePage: React.FC<ProductProfilePageProps> = ({product}) => {

    const [showFullImage, setShowFullImage] = useState(false);

    const hasNoOwners = product.details?.previous_owners === 0;
    const hasExtras = product.details?.extras !== undefined && product.details.extras.length > 0;

    const [collections, setCollections] = useState<Collection[]>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
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
            <div className="relative h-[200px] w-full bg-cover bg-center rounded-t-4xl"
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
                                <div className="grid grid-cols-3 gap-3">
                                    {product.details?.age && <StatItem value={product.details.age.toString()} label="Age"/>}
                                    {product.details?.height &&
                                        <StatItem value={product.details.height.feet} label="Height"/>}
                                    {product.details?.weight &&
                                        <StatItem value={product.details.weight.pounds} label="Weight"/>}
                                    {product.details?.biometry && <StatItem value={product.details.biometry} label="Biometry"/>}
                                    {product.details?.maxWear && <StatItem value={product.details.maxWear} label="Max Wear"/>}
                                    {product.details?.condition && <StatItem value={product.details.condition} label="Condition"/>}
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
                                <div className="grid grid-cols-2 gap-3">
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
                                <div className="grid grid-cols-2 gap-4">
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