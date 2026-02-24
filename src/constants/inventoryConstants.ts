export const PRODUCTS_COLLECTION = "products";

export const PRODUCT_CATEGORIES = [
    "electronics",
    "clothing",
    "food",
    "tools",
    "other"
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];