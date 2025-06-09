import ProductCard from "./ProductCard";
import type {Product} from "../types/product.ts";
import {fetchProducts} from "../services/productService.ts";
import React, {useEffect, useState} from "react";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setLoading(false);
            } catch {
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-gray-950 text-white px-6 py-4 rounded-xl shadow-lg animate-pulse">
                    <h1 className="text-2xl font-semibold">Loading products, please wait...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold">An error occurred while loading products.</h1>
                </div>
            </div>
        );
    }


    return (
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 justify-between mt-10 items-start">
            {products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
            ))}
        </div>
    );
};

export default ProductList;