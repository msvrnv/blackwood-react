import Hero from "../components/Hero.tsx";
import CollectionList from "../components/CollectionList.tsx";
import {useEffect, useState} from "react";
import type {Collection} from "../types/collection.ts";
import {fetchAllCollections} from "../services/collectionService.ts";
import {fetchHeroSlides, type HeroSlide} from "../services/heroSlidesService.ts";

const CollectionsListPage = () => {

    const [collections, setCollections] = useState<Collection[]>([]);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchAllCollections();
                const heroSlides = await fetchHeroSlides();

                setCollections(data);
                setHeroSlides(heroSlides);
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
        <>
            <Hero slides={heroSlides}/>
            <CollectionList collections={collections}/>
        </>
    );
};

export default CollectionsListPage;