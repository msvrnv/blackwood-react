import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGem, faLemon} from '@fortawesome/free-solid-svg-icons';
import {TagBadge} from "./TagBadge.tsx";
import type {Product} from "../../types/product.ts";
import Badge from "./Badge.tsx";

interface MobileProfileHeaderProps {
    product: Product;
    hasNoOwners: boolean;
    hasExtras: boolean;
    onImageClick: () => void;
}

export const MobileProfileHeader: React.FC<MobileProfileHeaderProps> = ({
                                                                            product,
                                                                            hasNoOwners,
                                                                            hasExtras,
                                                                            onImageClick
                                                                        }) => (
    <div className="block md:hidden w-full bg-black text-white rounded-t-4xl overflow-hidden relative">
        <div
            className="w-full bg-cover bg-center rounded-t-4xl"
            style={{ backgroundImage: `url(${product.image})` }}
        >
            <div className="w-full h-full bg-black/60 backdrop-blur-sm rounded-t-4xl">
                <div className="relative z-10 flex flex-col items-center pt-6 px-4 pb-6">
                    <div className="w-full flex justify-end mb-2">
                        <img
                            src={product.flag}
                            alt="flag"
                            className="w-8 h-5 border border-white rounded-sm"
                        />
                    </div>

                    <button
                        onClick={onImageClick}
                        className="hover:ring-4 hover:ring-pink-500/30 transition-all rounded-full"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    </button>

                    <h1 className="mt-4 text-2xl font-semibold text-center">{product.name}</h1>
                    <p className="text-white/70 text-sm text-center">
                        @{product.name.toLowerCase().replace(/\s/g, '')}
                    </p>

                    {product.details?.profileBadges !== undefined && product.details?.profileBadges?.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {product.details.profileBadges.map((badge, index) => (
                                <TagBadge key={index} text={badge.text} color={badge.color} />
                            ))}
                        </div>
                    )}

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
);