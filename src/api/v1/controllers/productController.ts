import { Request, Response } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../services/productService";

import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Product } from "../models/productModel";
import { DeleteResult } from "../services/productService";

/**
 * Create Product Controller
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @returns the created status json
 */
export async function createProductController(req: Request, res: Response): Promise<Response> {
    try {
        const created: Product = await createProduct(req.body);
        return res.status(HTTP_STATUS.CREATED).json(created);
    }catch (error: unknown){
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message });
    }
}

/**
 * Get All Products Controller
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @returns the products json
 */
export async function getProductsController(req: Request, res: Response): Promise<Response> {
    try{
        const products: Product[] = await getProducts();
        return res.status(HTTP_STATUS.OK).json(products);
    }catch (error: unknown){
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message});
    }
}

/**
 * Get Product by ID Controller
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @returns the product by ID json
 */
export async function getProductByIdController(req: Request, res: Response): Promise<Response> {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const product: Product | null = await getProductById(id);

        if(!product){
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({error: "Product not found"});
        }

        return res.status(HTTP_STATUS.OK).json(product);
    }catch (error: unknown){
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: (error as Error).message});
    }
}

/**
 * Update Product Controller
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @returns the updated product
 */
export async function updateProductController(req: Request, res: Response): Promise<Response> {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const updated: Product = await updateProduct(id, req.body);

        return res.status(HTTP_STATUS.OK).json(updated);
    }catch(error: unknown){
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message});
    }
}

/**
 * Delete Product Controller
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @returns the deleted product
 */
export async function deleteProductController(req: Request, res: Response): Promise<Response> {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const result: DeleteResult = await deleteProduct(id);

        return res.status(HTTP_STATUS.OK).json(result);
    }catch(error: unknown){
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message});
    }
}