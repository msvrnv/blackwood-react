import React from "react";

interface ProductSectionHeaderProps {
    header: string;
    description: string;
}

const ProductSectionHeader: React.FC<ProductSectionHeaderProps> = ({
                                                                       header,
                                                                       description
                                                                   }) => {
    return (
        <div id="collection-header" className="mt-12 mb-8 flex flex-col items-start gap-4">
            <h2 className="text-white text-2xl m-0 uppercase">{header}</h2>
            <div className="h-0.5 w-20 bg-white my-2" />
            <p
                id="collection-subheader"
                className="text-gray-300 text-base m-0 max-w-[600px]"
            >
                {description}
            </p>
        </div>
    );
};

export default ProductSectionHeader;