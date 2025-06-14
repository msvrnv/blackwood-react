interface PurchaseSectionProps {
    price: string;
}

export const PurchaseSection: React.FC<PurchaseSectionProps> = ({price}) => (
    <div className="mt-10 text-center">
        <button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-all shadow-lg transform hover:scale-105">
            Purchase Now · {price}
        </button>
        <p className="text-white/60 text-sm mt-3">30-day satisfaction guarantee · Discreet worldwide shipping</p>
        <div className="mt-4 text-xs text-white/40">
            <p>By purchasing, you certify that you understand this item was molded in the likeness of a once-living person.</p>
        </div>
    </div>
);