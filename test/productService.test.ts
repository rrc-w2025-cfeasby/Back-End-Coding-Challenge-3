import {
    createProduct,
    getProductById,
    updateProduct
} from "../src/api/v1/services/productService";

import * as repo from "../src/api/v1/repositories/productRepository";

// Mock repository functions
jest.mock("../src/api/v1/repositories/productRepository");

describe("Product Service", () => {
    // Sample test data to use for tests
    const products = [
        {
            id: "prod_001",
            name: "Wireless Mouse",
            sku: "ELE1234",
            quantity: 150,
            price: 29.99,
            category: "electronics",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "prod_002",
            name: "Cotton T-Shirt",
            sku: "CLO5678",
            quantity: 500,
            price: 19.99,
            category: "clothing",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // CREATE PRODUCT
    test("createProduct should call repository and return created product", async () => {
        const input = {
            name: "Wireless Mouse",
            sku: "ELE1234",
            quantity: 150,
            price: 29.99,
            category: "electronics"
        };

        const created = {
            ...input,
            id: "prod_123",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        (repo.createDocument as jest.Mock).mockResolvedValue(created);

        const result = await createProduct(input);

        expect(repo.createDocument).toHaveBeenCalledTimes(1);
        expect(result).toEqual(created);
    });

    // GET PRODUCT BY ID
    test("getProductById should return null when product does not exist", async () => {
        (repo.getDocumentById as jest.Mock).mockResolvedValue(null);

        const result = await getProductById("nonexistent");

        expect(result).toBeNull();
    });

    // UPDATE PRODUCT
    test("updateProduct should call repository and return updated product", async () => {
        const updated = {
            ...products[0],
            price: 39.99,
            updatedAt: new Date()
        };

        (repo.updateDocument as jest.Mock).mockResolvedValue(updated);

        const result = await updateProduct("prod_001", { price: 39.99 });

        expect(repo.updateDocument).toHaveBeenCalledTimes(1);
        expect(result.price).toBe(39.99);
    });
});