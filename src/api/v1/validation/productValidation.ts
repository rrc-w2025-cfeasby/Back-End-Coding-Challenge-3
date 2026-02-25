import Joi from "joi";
import { PRODUCT_CATEGORIES } from "../../../constants/inventoryConstants";

// SKU Regex: 3 uppercase letters and 4 digits
const skuPattern = /^[A-Z]{3}\d{4}$/;

// Post operation schemas organized by request part
export const productSchemas = {
    // POST /products
    create: {
        body: Joi.object({
            name: Joi.string().min(2).max(80).required().messages({
                "string.empty": "Name cannot be empty",
                "string.min": "Name must be at least 2 characters",
                "string.max": "Name must be at most 80 characters",
                "any.required": "Name is required"
            }),

            sku: Joi.string().pattern(skuPattern).required().messages({
                "string.pattern.base": `SKU must match pattern /^[A-Z]{3}\d{4}$/`,
                "any.required": "SKU is required"
            }),

            quantity: Joi.number().integer().min(0).required().messages({
                "number.base": "Quantity must be a number",
                "number.integer": "Quantity must be an integer",
                "number.min": "Quantity cannot be negative",
                "any.required": "Quantity is required"
            }),

            price: Joi.number().positive().precision(2).required().messages({
                "number.base": "Price must be a number",
                "number.positive": "Price must be positive",
                "number.precision": "Price must have at most 2 decimal places",
                "any.required": "Price is required"
            }),

            category: Joi.string()
                .valid(... PRODUCT_CATEGORIES)
                .required()
                .messages({
                    "any.only": `Category must be one of: ${PRODUCT_CATEGORIES.join(", ")}`,
                    "any.required": "Category is required"
                })
        })
    },

    // GET /products/:id
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
                "string.empty": "Product ID cannot be empty"
            })
        })
    },

    // PUT /product/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
                "string.empty": "Product ID cannot be empty"
            })
        }),

        body: Joi.object({
            name: Joi.string().min(2).max(80).optional(),
            quantity: Joi.number().integer().min(0).optional(),
            price: Joi.number().positive().precision(2).optional(),
            category: Joi.string().valid(...PRODUCT_CATEGORIES).optional(),

            // SKU cannot be updated
            sku: Joi.forbidden().messages({
                "any.unknown": "SKU cannot be updated"
            })
        })
    },

    // DELETE /products/:id
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
                "string.empty": "Product ID cannot be empty"
            })
        })
    }
};