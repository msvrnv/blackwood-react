export interface Product {
    id: number;
    name: string;
    image: string;
    flag: string;
    price: string;
    description: string;
    collections?: number[];
    details?: {
        age: number;
        quotes?: string[];
        ethnicity?: string;
        biometry: string;
        maxWear: string;
        condition : string;
        background: string;
        height: { feet: string; meters: string };
        weight: { pounds: string; kilograms: string };
        measurements: { inches: string; cm: string };
        pussy_type: string;
        sexual_preference: string;
        previous_owners: number;
        kinks?: Array<{
            text: string;
            color?: string;
        }>;
        extras?: Array<{
            name: string,
            description: string,
            value: string,
            exclusive: boolean
        }>;
        appearance?: string[];
        personality?: string[];
        exploitationScenarios?: Array<{
            title: string;
            description: string;
        }>;
        previousOwnerNote: string;
        personaHistory?: Array<{
            date: string;
            title: string;
            description: string;
        }>;
        familyRelationships?: Array<{
            name: string;
            relation: string;
            status?: string;
        }>;
        profileBadges?: Array<{
            text: string;
            color: string;
        }>;
        advancedFeatures?: Array<{
            title: string;
            description: string;
        }>;
        accessories?: Array<{
            name: string;
            type: string;
            description: string;
            price: string;
            included: boolean;
        }>;
    }
}