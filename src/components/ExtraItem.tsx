import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt, faCoins, faCrown} from "@fortawesome/free-solid-svg-icons";

export const ExtraItem: React.FC<{
    name: string;
    description: string;
    value: string;
    exclusive: boolean;
}> = ({name, description, value, exclusive}) => {
    return (
        <div
            className="group relative flex items-start gap-4 p-4 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-white/5 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10">
            <div
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faBolt} className="w-5 h-5 text-pink-400"/>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-white">{name}</h4>
                    {exclusive && (
                        <span
                            className="text-xs bg-gradient-to-r from-amber-400/20 to-amber-600/20 text-amber-400 px-2 py-1 rounded-full flex items-center gap-1">
                            <FontAwesomeIcon icon={faCrown} className="w-3 h-3"/>
                            EXCLUSIVE
                        </span>
                    )}
                </div>

                <p className="text-sm text-white/80 mt-1 mb-3">{description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-white/50 mb-1">VALUE ESTIMATE</span>
                        <div
                            className="px-3 py-2 bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/20 rounded-lg flex items-center gap-2">
                            <FontAwesomeIcon icon={faCoins} className="w-3 h-3 text-amber-400"/>
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