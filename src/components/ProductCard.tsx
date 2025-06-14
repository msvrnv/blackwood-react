import React from "react";
import {Link} from "react-router-dom";
import type {MinifiedProduct} from "../services/productService.ts";
import Badge from "./product-profile-sections/Badge.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faLemon, faWandSparkles, faStar, faCrown } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
    product: MinifiedProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const hasNoOwners = parseInt(product.previous_owners) === 0;
    const hasExtras = product.extras_count !== undefined && product.extras_count > 0;
    const isSpecial = product.is_special;

    return (
        <div className={`flex flex-col h-full ${isSpecial ? 'bg-gradient-to-br from-[#2a1a30] to-[#1a1a2a]' : 'bg-[#1a1a1a]'} text-white border ${isSpecial ? 'border-purple-500' : 'border-[#666]'} rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${isSpecial ? 'hover:shadow-[0_0_15px_#a855f7]' : 'hover:shadow-[0_0_15px_#6666]'} min-w-[220px] relative`}>
            {isSpecial && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            )}

            <div className="relative w-full h-[240px] overflow-hidden">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={`${product.name} Skinsuit`}
                         className="w-full h-full object-cover object-center"/>
                </Link>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isSpecial && (
                        <Badge
                            bgColorClass="bg-gradient-to-r from-purple-600 to-pink-600"
                            icon={<FontAwesomeIcon icon={faCrown} className="w-3 h-3" />}
                        />
                    )}
                    {product.is_celebrity && (
                        <Badge
                            bgColorClass="bg-pink-500"
                            icon={<FontAwesomeIcon icon={faWandSparkles} className="w-3 h-3" />}
                        />
                    )}
                    {hasNoOwners && (
                        <Badge
                            bgColorClass="bg-amber-400"
                            icon={<FontAwesomeIcon icon={faLemon} className="w-3 h-3" />}
                        />
                    )}
                    {hasExtras && (
                        <Badge
                            bgColorClass="bg-indigo-600"
                            icon={<FontAwesomeIcon icon={faGem} className="w-3 h-3" />}
                        />
                    )}
                </div>


                <img src={product.flag} alt="Flag"
                     className={`absolute bottom-1 right-1 w-[30px] h-[20px] border ${isSpecial ? 'border-purple-400' : 'border-white'} rounded-sm`}/>
            </div>

            <div className="p-4 flex flex-col gap-3 flex-grow">
                <h2 className={`text-xl font-medium uppercase ${isSpecial ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : ''}`}>
                    {product.name}
                    {isSpecial && (
                        <FontAwesomeIcon icon={faStar} className="ml-2 text-yellow-400" />
                    )}
                </h2>
                <p className={`text-sm italic ${isSpecial ? 'text-[#eee]' : 'text-[#ddd]'}`}>{product.description}</p>
                <div className="flex-grow"></div>

                {/* Modern Price Display */}
                <div className="relative w-full mb-3 mt-5">
                    <div className={`absolute -top-5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${isSpecial ? '[#a855f7]' : '[#444]'} to-transparent`}></div>
                    <div className="flex items-center justify-center gap-1">
                        <span className={`text-2xl font-bold bg-gradient-to-r ${isSpecial ? 'from-purple-400 to-pink-400' : 'from-amber-400 to-amber-600'} bg-clip-text text-transparent`}>
                            {product.price.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Buy Now Button */}
                <Link to={`/product/${product.id}`}>
                    <button className={`w-full px-4 py-3 ${isSpecial ? 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500' : 'bg-gradient-to-br from-[#333] to-[#222] hover:from-[#444] hover:to-[#333]'} text-white rounded-lg text-sm font-bold uppercase transition-all duration-200 border ${isSpecial ? 'border-purple-400 hover:border-purple-300' : 'border-[#444] hover:border-[#555]'} shadow ${isSpecial ? 'hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]'}`}>
                        Buy Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;