import React, { useEffect, useState } from 'react';

type HeroSlide = {
    title: string;
    description: string;
    buttonText: string;
    image: string;
    alt: string;
    background: string;
    features: string[];
};

type HeroProps = {
    slides: HeroSlide[];
};

const Hero: React.FC<HeroProps> = ({ slides }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // 5 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, [slides.length]);

    return (
        <div className="mt-5 p-[1px] rounded-[45px] bg-gradient-to-r from-[#666666] via-black to-[#666666] max-lg:rounded-none">
            <div className="bg-black rounded-[45px] max-lg:rounded-none">
                <div className="relative overflow-hidden rounded-[45px] max-lg:rounded-none">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`relative transition-opacity duration-700 ease-in-out ${
                                index === activeIndex ? 'block animate-fade' : 'hidden'
                            }`}
                        >
                            <div
                                className="flex p-[100px] h-[500px] items-stretch rounded-[45px] bg-no-repeat bg-center bg-[length:110%] text-white px-6 py-4 overflow-hidden transition-[background-position] duration-300 ease-in-out
                                    max-lg:flex-col max-lg:h-auto max-lg:rounded-none max-lg:bg-cover max-lg:px-5 max-lg:pb-0"
                                style={{ backgroundImage: slide.background }}
                            >
                                <div className="flex flex-col my-10 justify-center items-center max-w-[500px] px-[60px] pr-[40px] z-10 box-border max-lg:max-w-full max-lg:px-5">
                                    <h1 className="text-[2.5rem] mb-5 text-center uppercase max-lg:text-[1.8rem]">
                                        {slide.title}
                                    </h1>
                                    <p className="text-[1.1rem] font-medium text-[#ddd] mb-5 text-center max-lg:text-[1rem]">
                                        {slide.description}
                                    </p>
                                    <ul className="list-none p-0 mb-5 text-left text-[#ddd] text-[1rem] max-lg:text-[1rem]">
                                        {slide.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-white"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="bg-white/10 border border-white text-white px-6 py-3 rounded-full text-[1rem] font-bold uppercase w-full hover:bg-white/25 transition duration-300">
                                        {slide.buttonText}
                                    </button>
                                </div>

                                <div className="absolute right-0 h-[550px] flex justify-end items-start overflow-hidden -mb-5
                                    max-lg:relative max-lg:h-auto max-lg:mb-0 max-lg:justify-center max-lg:items-center lg:mr-10">
                                    <img
                                        src={slide.image}
                                        alt={slide.alt}
                                        className="h-full object-cover rounded-br-[45px] lg:mt-0
                                            max-lg:w-full max-lg:h-auto max-lg:max-h-[400px] max-lg:object-contain max-lg:rounded-[20px] mt-3"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
