import ProductProfilePage from "../components/ProductProfilePage.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Product} from "../types/product.ts";
import {fetchProductById} from "../services/productService.ts";

const ProductPage = () => {
    const { productId } = useParams();

    const [product, setProduct] = useState<Product>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (productId === undefined) {
                setError("Failed to load product. Please try again later.");
                setLoading(false);
                return;
            }

            try {
                const product = await fetchProductById(parseInt(productId));

                if (product === undefined)
                    return;

                setProduct(product);
                setLoading(false);
            } catch {
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            }
        };

        loadData();
    }, [productId]);

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

    if (product === undefined) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold">An error occurred while loading products.</h1>
                </div>
            </div>
        );
    }

    return (
        <ProductProfilePage product={product} />
    );
};

export default ProductPage;