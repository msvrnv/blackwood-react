export const BASE_PATH = "/blackwood-react";

export const getFullPath = (route: string) =>
    `${BASE_PATH}${route}`.replace(/\/{2,}/g, "/");