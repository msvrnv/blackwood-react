import type { Product } from "../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('https://grevrwdhbvzyevkdvoig.supabase.co/rest/v1/products?select=*', {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZXZyd2RoYnZ6eWV2a2R2b2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjY4MjIsImV4cCI6MjA2NDk0MjgyMn0.RHuKTSgKODSSWJgA0BB-zkEIeU_pq9_pul4I7V3aQI4',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data: Product[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
};