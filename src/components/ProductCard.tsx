import React, {useState} from "react";
import type {Product} from "../types/product.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faUser,
    faGlobe,
    faBriefcase,
    faRulerVertical,
    faWeight,
    faRulerCombined,
    faVenus,
    faHeart,
    faHistory,
    faDollarSign
} from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
    product: Product;
}

const Panel: React.FC<{
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}> = ({title, children, defaultOpen = false}) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="bg-[#222] p-2 rounded-lg border border-[#444] mb-2">
            <div
                className={`text-white text-sm font-bold uppercase mb-2 flex justify-between items-center cursor-pointer`}
                onClick={() => setOpen(!open)}
            >
                {title}
                <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp}/>
            </div>
            <div className={`text-sm text-[#bbb] ${open ? "block" : "hidden"}`}>{children}</div>
        </div>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    return (
        <div className="flex flex-col h-full bg-[#1a1a1a] text-white border border-[#666] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_#6666] min-w-[220px]">
            <div className="relative w-full h-[240px] overflow-hidden">
                <img src={product.image} alt={`${product.name} Skinsuit`}
                     className="w-full h-full object-cover object-center"/>
                <img src={product.flag} alt={`${product.ethnicity} Flag`}
                     className="absolute bottom-1 right-1 w-[30px] h-[20px] border border-white rounded-sm"/>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-grow">
                <h2 className="text-xl font-medium uppercase">{product.name}</h2>
                <p className="text-sm italic text-[#ddd]">{product.description}</p>

                <Panel title="Vital Stats">
                    <p className="mt-1"><FontAwesomeIcon icon={faUser} className="mr-2 w-3"/> Age: {product.age}</p>
                    <p className="mt-1"><FontAwesomeIcon icon={faGlobe}
                                                         className="mr-2 w-3 mt-2"/> Ethnicity: {product.ethnicity}</p>
                    <p className="mt-1"><FontAwesomeIcon icon={faBriefcase}
                                                         className="mr-2 w-3"/> Background: {product.background}</p>
                    <p className="mt-1"><FontAwesomeIcon icon={faRulerVertical}
                                                         className="mr-2 w-3"/> Height: {product.height.feet} ({product.height.meters})
                    </p>
                    <p className="mt-1"><FontAwesomeIcon icon={faWeight}
                                                         className="mr-2 w-3"/> Weight: {product.weight.pounds} ({product.weight.kilograms})
                    </p>
                    <p className="mt-1"><FontAwesomeIcon icon={faRulerCombined}
                                                         className="mr-2 w-3"/> Measurements: {product.measurements.inches} ({product.measurements.cm} cm)
                    </p>
                </Panel>

                <Panel title="Fetish Profile">

                    <p className="mt-1">
                        <FontAwesomeIcon icon={faVenus} className="mr-2 w-3"/>
                        Pussy Type: {product.pussyType}</p>
                    <p className="mt-1">
                        <FontAwesomeIcon icon={faHeart} className="mr-2 w-3"/>
                        Orientation: {product.sexualPreference}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {product.kinks.map((kink, i) => (
                            <span key={i}
                                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                                {kink}
                            </span>
                        ))}
                    </div>
                </Panel>

                <Panel title="Ownership" defaultOpen>
                    <p className="mt-1">
                        <FontAwesomeIcon icon={faHistory} className="mr-2 w-3" />
                        Previous Owners: {product.previousOwners}</p>
                    <p className="mt-1">
                        <FontAwesomeIcon icon={faDollarSign} className="mr-2 w-3" />
                        Price: {product.price}
                    </p>
                </Panel>

                <div className="flex flex-wrap gap-1">
                    {product.personality.map((tag, i) => (
                        <span key={i} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex-grow"></div>
                <button
                    className="mt-3 px-4 py-2 border border-white text-white rounded-full text-sm font-bold uppercase hover:bg-white/15 transition">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
