import { supabase } from "./supabaseClient.ts";
import type { Collection } from "../types/collection.ts";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const collectionCache = {
    all: {
        data: null as Collection[] | null,
        expiry: 0,
    },
    byId: new Map<number, { data: Collection | null, expiry: number }>()
};

export const fetchAllCollections = async (): Promise<Collection[]> => {
    const now = Date.now();

    if (collectionCache.all.data && collectionCache.all.expiry > now) {
        return collectionCache.all.data;
    }

    console.log(`Fetching collections...`);

    const { data, error } = await supabase
        .from("collections")
        .select("id, name:collection_name, description:collection_description, icon: collection_icon");

    if (error || data === null) return [];

    collectionCache.all = {
        data,
        expiry: now + CACHE_TTL
    };

    return data;
};

export const fetchCollectionById = async (id: number): Promise<Collection | null> => {
    const now = Date.now();
    const cached = collectionCache.byId.get(id);

    if (cached && cached.expiry > now) {
        return cached.data;
    }

    console.log(`Fetching collection ${id}`);

    const { data, error } = await supabase
        .from("collections")
        .select("id, name:collection_name, description:collection_description, icon: collection_icon")
        .eq("id", id)
        .single();

    if (error || data === null) {
        collectionCache.byId.set(id, { data: null, expiry: now + CACHE_TTL });
        return null;
    }

    collectionCache.byId.set(id, { data, expiry: now + CACHE_TTL });

    return data;
};


export const fetchCollectionsByIds = async (ids: number[]): Promise<Collection[] | null> => {
    const { data } = await supabase
        .from("collections")
        .select("id, name:collection_name, description:collection_description, icon: collection_icon")
        .in("id", ids);

    return data;
};
