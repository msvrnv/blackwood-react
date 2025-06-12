import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ProductSectionHeader from "../components/ProductSectionHeader.tsx";
import ProductList from "../components/ProductList.tsx";
import {type MinifiedProduct, fetchByCollection} from "../services/productService.ts";
import type {Collection} from "../types/collection.ts";
import {fetchCollectionById} from "../services/collectionService.ts";
import {fetchHeroSlides, type HeroSlide} from "../services/heroSlidesService.ts";
import Hero from "../components/Hero.tsx";

const CollectionPage = () => {

    const { collectionId } = useParams();

    const [products, setProducts] = useState<MinifiedProduct[]>([]);
    const [collection, setCollection] = useState<Collection>();
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (collectionId === undefined) {
                setError("Failed to load products. Please try again later.");
                setLoading(false);
                return;
            }

            try {
                const collection = await fetchCollectionById(parseInt(collectionId));

                if (collection === null)
                    return;

                const slides = await fetchHeroSlides();
                setHeroSlides(slides);

                setCollection(collection);

                const products = await fetchByCollection(parseInt(collectionId));

                const sortedProducts = [...products].sort((a, b) => {
                    // If both are special or both are not special, sort by ID
                    if (a.is_special === b.is_special) {
                        return a.id - b.id;
                    }
                    // Sort special products first
                    return b.is_special ? 1 : -1;
                });

                setProducts(sortedProducts);
                setLoading(false);
            } catch {
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            }
        };

        loadData();
    }, [collectionId]);

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

    if (collection === undefined) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold">An error occurred while loading products.</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Hero slides={heroSlides}/>
            <ProductSectionHeader
                header={collection.name}
                description={collection.description}
            />
            <ProductList products={products} />
        </div>
    );
};

export default CollectionPage;