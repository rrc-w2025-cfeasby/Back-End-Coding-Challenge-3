import { Router } from "express";
import {
    createProductController,
    getProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
} from "../controllers/productController";

import { validateRequest } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";

const router: Router = Router();

// CREATE Product
router.post(
    "/",
    validateRequest(productSchemas.create),
    createProductController
);

// GET all Products
router.get(
    "/",
    getProductsController
);

// GET by ID
router.get(
    "/:id",
    validateRequest(productSchemas.getById),
    getProductByIdController
);

// UPDATE
router.get(
    "/:id",
    validateRequest(productSchemas.update),
    updateProductController
);

// DELETE
router.delete(
    "/:id",
    validateRequest(productSchemas.delete),
    deleteProductController
);

export default router;