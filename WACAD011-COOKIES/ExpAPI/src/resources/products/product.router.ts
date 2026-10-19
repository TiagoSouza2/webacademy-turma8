import { Router } from "express"
import productController from "./product.controller.js"
import validate from "@/middlewares/validate.js"
import productSchema from "./product.schema.js"
const router = Router()

router.get("/", productController.index)
router.post("/", validate(productSchema), productController.create)
router.get("/:id", productController.read)
router.get("/:id", productController.update)
router.get("/:id", productController.remove)

export default router