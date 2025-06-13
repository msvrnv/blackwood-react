import React from "react";

export const TagBadge: React.FC<{ text: string; color?: string }> = ({text, color = "white"}) => {
    return (
        <span className={`text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm`}
              style={{backgroundColor: color}}>
            {text}
        </span>
    );
};