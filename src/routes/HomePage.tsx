import Hero from "../components/Hero.tsx";
import ProductSectionHeader from "../components/ProductSectionHeader.tsx";
import ProductList from "../components/ProductList.tsx";
import {type MinifiedProduct, fetchRandom} from "../services/productService.ts";
import {useEffect, useState} from "react";
import {fetchHeroSlides, type HeroSlide} from "../services/heroSlidesService.ts";

const HomePage = () => {

    const [products, setProducts] = useState<MinifiedProduct[]>([]);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const slides = await fetchHeroSlides();
                setHeroSlides(slides);

                const data = await fetchRandom(4);
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
        <>
            <Hero slides={heroSlides}/>
            <ProductSectionHeader
                header="Check Out Our Products"
                description="Browse through our products and discover skins tailored to your style and needs."
            />
            <ProductList products={products} />
        </>
    );
};

export default HomePage;