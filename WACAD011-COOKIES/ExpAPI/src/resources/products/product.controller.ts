import { type Request, type Response } from "express"
import { checkProductExists, CreateProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from "./product.service.js"
import type { CreateProductDto, UpdateProductDto } from "./product.types.js"
import { handleError } from "./products.errors.js"

const index = async(req: Request, res: Response ) => {
    try{
        const products = await getAllProducts()
        res.status(200).json(products)
    } catch(err){
        handleError(err, res)
    }
}

const create = async (req: Request, res: Response ) => {
    const data = req.body as CreateProductDto;
    try {
        if(!(await checkProductExists(data.name))) {
            const product = await CreateProduct(data)
            res.status(200).json(product)
        }
        else {
            res.status(409).json()
        }
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
const read = async (req: Request, res: Response ) => {
    const id = req.params.id as string
        try {
            const product = await getProduct(id)
            res.status(200).json(product)
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

const update = async (req: Request, res: Response ) => {
    const id = req.params.id as string
    const data = req.body as UpdateProductDto
    try{
        if(! await checkProductExists(data.name, id)){
            const product = await updateProduct(id, data)
            res.status(200).json(200)
        }else{
            res.status(409).json()
        }
    }catch(err){
        handleError(err, res)
    }
}
const remove = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        await deleteProduct(id);
        res.status(204).send();
    } catch (err) {
        handleError(err, res);
    }
};
export default { index, create, read, update, remove}