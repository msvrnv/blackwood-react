import React from "react";
import {Link} from "react-router-dom";
import type {MinifiedProduct} from "../services/productService.ts";
import Badge from "./Badge.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faLemon } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
    product: MinifiedProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const hasNoOwners = parseInt(product.previous_owners) === 0;
    const hasExtras = product.extras_count !== undefined && product.extras_count > 0;

    return (
        <div className="flex flex-col h-full bg-[#1a1a1a] text-white border border-[#666] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_#6666] min-w-[220px]">
            <div className="relative w-full h-[240px] overflow-hidden">
                <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={`${product.name} Skinsuit`}
                     className="w-full h-full object-cover object-center"/>
                </Link>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {hasNoOwners && (
                        <Badge
                            text="FRESH PERSONA"
                            bgColorClass="bg-amber-400"
                            icon={<FontAwesomeIcon icon={faLemon} className="w-3 h-3" />}
                        />
                    )}
                    {hasExtras &&
                        <Badge
                            text="COMES WITH EXTRAS"
                            bgColorClass="bg-indigo-600"
                            icon={<FontAwesomeIcon icon={faGem} className="w-3 h-3" />}
                        />
                    }
                </div>

                <img src={product.flag} alt="Flag"
                     className="absolute bottom-1 right-1 w-[30px] h-[20px] border border-white rounded-sm"/>
            </div>

            <div className="p-4 flex flex-col gap-3 flex-grow">
                <h2 className="text-xl font-medium uppercase">{product.name}</h2>
                <p className="text-sm italic text-[#ddd]">{product.description}</p>
                <div className="flex-grow"></div>

                {/* Modern Price Display */}
                <div className="relative w-full mb-3 mt-5">
                    <div className="absolute -top-5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent"></div>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            {product.price.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Buy Now Button */}
                <Link to={`/product/${product.id}`}>
                    <button className="w-full px-4 py-3 bg-gradient-to-br from-[#333] to-[#222] hover:from-[#444] hover:to-[#333] text-white rounded-lg text-sm font-bold uppercase transition-all duration-200 border border-[#444] hover:border-[#555] shadow hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                        Buy Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;