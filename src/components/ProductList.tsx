import ProductCard from "./ProductCard";
import type {MinifiedProduct} from "../services/productService.ts";

interface ProductListProps {
    products: MinifiedProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 justify-between mt-10 items-start">
            {products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
