import { 
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/productRepository";

import { PRODUCTS_COLLECTION } from "../../../constants/inventoryConstants";
import { Product } from "../models/productModel";

// TYPES
// Data required to create a product
export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

// Data allowed to update
export type UpdateProductInput = Partial<Omit<Product, "id" | "createdAt" | "sku">>;

// Return type for delete operation
export interface DeleteResult { message: string; }

/**
 * Create Product
 * @param data - The product collection type used
 * 
 * @returns Promise<Product> - The created product
 */
export async function createProduct(data: CreateProductInput): Promise<Product>{
    const timestamp: Date = new Date();

    const productToCreate: Omit<Product, "id"> = {
        ... data,
        createdAt: timestamp,
        updatedAt: timestamp
    };

    const created: Product = await createDocument(
        PRODUCTS_COLLECTION,
        productToCreate
    );

    return created;
}

/**
 * Get all products
 * 
 * @returns Promise<Product> - All products
 */
export async function getProducts(): Promise<Product[]>{
    const products: Product[] = await getAllDocuments<Product>(PRODUCTS_COLLECTION);
    return products;
}

/**
 * Get Product by ID
 * 
 * @param id - the Id the returned product
 */
export async function getProductById(id: string): Promise<Product | null>{
    const product: Product | null = await getDocumentById<Product>(PRODUCTS_COLLECTION, id);
    return product;
}

/**
 * Update product
 * 
 * @param id - the Id the updated product
 * @param data - The data collection
 */
export async function updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
    if("sku" in data){
        throw new Error("SKU cannot be updated");
    }

    const timestamp: Date = new Date();
    
    const updatedData: UpdateProductInput = {
        ... data,
        updatedAt: timestamp
    };

    const updated: Product = await updateDocument<Product>(
        PRODUCTS_COLLECTION,
        id,
        updatedData
    );

    return updated;
}

/**
 * Delete product
 * 
 * @param id - the Id the deleted product
 * 
 * @returns Promise<DeleteResult> - The deleted product
 */
export async function deleteProduct(id: string): Promise<DeleteResult> {
    await deleteDocument(PRODUCTS_COLLECTION, id);

    const result: DeleteResult = {
        message: `Product ${id} deleted successfully`
    };

    return result;
}