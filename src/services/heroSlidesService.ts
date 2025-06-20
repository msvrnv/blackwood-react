import heroBg from "../assets/hero-section-background.png";
import housewife from "../assets/housewife.png";
import hijabi from "../assets/hijabi.png";
import pregnant from "../assets/pregnant.png";

export interface HeroSlide {
    title: string;
    description: string;
    features: string[];
    buttonText: string;
    image: string;
    route: string;
    alt: string;
    background: string;
}

export const fetchHeroSlides = async (): Promise<HeroSlide[]> => {
    const heroSlides: HeroSlide[] = [
        {
            title: "Defile Her Veiled Virtue",
            description:
                "Slip into our Arabic hijabi skinsuits and ravage the taboo, draping yourself in submissive, exotic flesh that begs to be violated.",
            features: [
                "Exotic desert whore aesthetic for depraved fantasies",
                "Tight fit to flaunt submissive, breedable curves",
                "Dominate her culture with every sinful step",
            ],
            buttonText: "Ravage Her Forbidden Body",
            image: hijabi,
            route: 'product/19',
            alt: "Hijabi Skinsuit",
            background: `url(${heroBg})`,
        },
        {
            title: "Enslave the Perfect Housewife",
            description:
                "Become the ultimate subservient slut with our housewife skinsuits, built to serve, please, and be used in every filthy way imaginable.",
            features: [
                "Prime white breeder body for total submission",
                "Curves crafted for rough, degrading use",
                "Live the fantasy of a broken domestic bitch",
            ],
            route: 'product/24',
            buttonText: "Own Her Pathetic Soul",
            image: housewife,
            alt: "Housewife Skinsuit",
            background: `url(${heroBg})`,
        },
        {
            title: "Defile Her Pregnant Womb",
            description:
                "Our Black pregnant skinsuits let you defile sacred motherhood, with lush, fertile curves that scream for perverse exploitation.",
            features: [
                "Voluptuous Black breeder body for taboo thrills",
                "Swollen curves to degrade and dominate",
                "Perfect for sick, primal fetishes",
            ],
            route: 'product/25',
            buttonText: "Violate Her Fertile Flesh",
            image: pregnant,
            alt: "Pregnant Skinsuit",
            background: `url(${heroBg})`,
        },
    ];

    return new Promise(resolve => {resolve(heroSlides);});
};