import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGem, faLemon} from '@fortawesome/free-solid-svg-icons';
import {TagBadge} from "./TagBadge.tsx";
import type {Product} from "../../types/product.ts";
import Badge from "./Badge.tsx";

interface DesktopProfileHeaderProps {
    product: Product;
    hasNoOwners: boolean;
    hasExtras: boolean;
    onImageClick: () => void;
}

export const DesktopProfileHeader: React.FC<DesktopProfileHeaderProps> = ({
                                                                              product,
                                                                              hasNoOwners,
                                                                              hasExtras,
                                                                              onImageClick
                                                                          }) => (
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
                        onClick={onImageClick}
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
                                {product.details?.profileBadges?.map((badge, index) => (
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
);