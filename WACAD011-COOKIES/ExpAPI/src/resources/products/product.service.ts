import { type Product } from '@/generated/prisma/client.js';
import prisma from "@/utils/getPrisma.js"
import type { CreateProductDto, UpdateProductDto } from './product.types.js';

export const getAllProducts = async(): Promise<Product[]> => {
 return prisma.product.findMany();
}

export const CreateProduct = async(data: CreateProductDto): Promise<Product> => {
    return prisma.product.create({ data })
}

export const checkProductExists = async (name: string, id?: string): Promise <boolean> => {
    if(id){
        return !!(await prisma.product.findFirst({where: {name, id: {notIn: [id]}}}))
    }
    return !!(await prisma.product.findFirst({where: {name}}))
}

export const getProduct = async (id: string): Promise<Product|null> => {
    return prisma.product.findFirst({where: {id}})
}
export const updateProduct = async (id: string, data: UpdateProductDto): Promise<Product> => {
    return prisma.product.update({data, where: {id}})
}