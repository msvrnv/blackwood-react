import React from "react";
import {faTooth} from "@fortawesome/free-solid-svg-icons/faTooth";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const AccessoryItem: React.FC<{
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