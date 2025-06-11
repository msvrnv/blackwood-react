import type {Product} from "../types/product";
import { supabase } from "./supabaseClient.ts";

export interface MinifiedProduct {
    id: number;
    name: string;
    image: string;
    price: string;
    flag: string;
    description: string;
    previous_owners: string;
    extras_count: number;
}

export const fetchAllProducts = async (): Promise<Product[]> => {

    const { data } = await supabase.from("products").select();

    if (data === null)
        return [];

    return data;
}

export const fetchProductById = async (id: number): Promise<Product | undefined> => {
    const { data } = await supabase.from("products").select().eq('id', id).single();

    if (data === null)
        return;

    return data;
}

export const fetchByCollection = async (collectionId:number): Promise<MinifiedProduct[]> => {
    const { data } = await supabase.from("minified_product").select().contains('collections', [collectionId]).order('id', { ascending: true });

    if (data === null)
        return [];

    return data;
}

export const fetchRandom = async (count: number): Promise<MinifiedProduct[]> => {
    const { data } = await supabase.from("minified_product_random").select().limit(count);

    if (data === null)
        return [];

    return data;
}