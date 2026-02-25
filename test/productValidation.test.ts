import { productSchemas } from "../src/api/v1/validation/productValidation";

describe("Product Validation", () => {
    const validProduct = {
        name: "Wireless Mouse",
        sku: "ELE1234",
        quantity: 150,
        price: 29.99,
        category: "electronics"
    };

    test("Valid product should pass validation", () => {
        const { error } = productSchemas.create.body!.validate(validProduct);
        expect(error).toBeUndefined();
    });
    test("Invalid SKU pattern should fail", () => {
        const invalid = { ...validProduct, sku: "abc1234" };
        const { error } = productSchemas.create.body!.validate(invalid);
        expect(error).toBeDefined();
    });

    test("Negative quantity should fail", () => {
        const invalid = { ...validProduct, quantity: -5 };
        const { error } = productSchemas.create.body!.validate(invalid);
        expect(error).toBeDefined();
    });

    test("Invalid category should fail", () => {
        const invalid = { ...validProduct, category: "invalidCategory" };
        const { error } = productSchemas.create.body!.validate(invalid);
        expect(error).toBeDefined();
    });
});