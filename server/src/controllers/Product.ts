import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import uploadToCloudinary from "../utils/cloudinaryUploader";

const prisma = new PrismaClient

export const CreateProduct = async(req: Request,res: Response):Promise<any> => {
    try {
        
        const { name , categoryId ,description}: {name: string,categoryId: string,description: string} = req.body;
        const file = req.files?.thumbnail;

        const fileUploadRes = await uploadToCloudinary(file,"my-files");

        const productRes = await prisma.product.create({
            data:{
                name: name,
                thumbnail: fileUploadRes.secure_url,
                categoryId: categoryId,
                description: description,
            },
            select:{
                id: true,
            }
        })

        return res.status(200).json({productRes})

    } catch (error) {
        console.log(error);
        return res.status(499).json({message:"Something wrong during product creation!"});
    }
}

export const UpdateProduct = async(req: Request,res: Response):Promise<any> => {
    try {
        let updatedData = req.body;
        const file = req.files?.thumbnail;
        const productId = req.params.productId;

        if(file){
            const uploadRes = await uploadToCloudinary(file,"my-files");
            updatedData.thumbnail = uploadRes.secure_url;
        }

        const result = await prisma.product.update({
            where:{
                id:productId
            },
            data: updatedData,
            select:{
                id: true
            }
        });

        return res.status(200).json({
            result
        })

    } catch (error) {
        console.log(error);
        return res.status(499).json({message:"Something wrong during product updation!"});
    }
}

export const DeleteProduct = async(req: Request,res: Response):Promise<any> => {
    try {
       const productId = req.params.productId;
       const result =  await prisma.product.delete({
        where:{
            id:productId
        }
       });
       return res.status(200).json({messae: "Product deleted successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(499).json({message:"Something wrong during product deletion!"});
    }
}

export const GetAllProducts = async(req: Request,res: Response):Promise<any> => {
    try {
        
        // const mostSelledProducts = await prisma.product.findMany({
        //     take: 10,
        //     orderBy:{
        //         sold:"desc"
        //     }
        // });

        const allProducts = await prisma.product.findMany({
            include:{
               productVariants: true 
            }
        });

        // const popularProducts = await prisma.product.findMany({
        //     take:10,
        //     orderBy:{
        //         rating:"desc"
        //     }
        // });

        return res.status(200).json({
            message:"Product fetched!",
            products:allProducts,
        })


    } catch (error) {
        console.log(error);
        return res.status(499).json({message:"Something wrong during product retreive!"});
    }
}

export const GetProductByQuery = async(req: Request,res: Response):Promise<any> => {
    try {
        const { search } = req.params;
        const products = await prisma.product.findMany({
            where:{
                name:{
                    contains: search
                }
            }
        });
        return res.status(200).json({
            products: products
        })
    } catch (error) {
        console.log(error);
        return res.status(499).json({message:"Something wrong during product retrieve!"});
    }
}

export const GetAllProductsByCategory = async(req: Request,res: Response):Promise<any> => {
    try {
        const products = await prisma.category.findMany({
            include:{
                products: true
            }
        });
        return res.status(200).json({
            message: "Product fetched successfully!",
            products:products
        })
    } catch (error) {
        console.log(error);
        return res.status(499).json({message:"Something wrong during product retrieve!"});
    }
}

export const CreateProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        const { size , price , salePrice , productId } = req.body;
        if(!size || !price || !salePrice || !productId)
            return res.status(401).json({message: "All fields are required"});

        const result = await prisma.productVariant.create({
            data:{
                size,
                price,
                salePrice,
                productId
            },
            select:{
                id: true,
            }
        });

        return res.status(200).json({result});
    } catch (error) {
       console.log("Error while create product variants",error); 
    }
}

export const UpdateProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        const {...updatedData} = req.body;
        const { id } = req.params;

        const result = await prisma.productVariant.update({
            where:{
                id: id
            },
            data:updatedData,
            select:{
                id: true
            }
        })
        return res.status(200).json({result})
    } catch (error) {
       console.log("Error while update product variants",error); 
    }
}

export const DeleteProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        await prisma.productVariant.delete({
            where:{
                id: id
            }
        })
        return res.status(200).json({message: "Product variant deleted!"})
    } catch (error) {
       console.log("Error while delete product variants",error); 
    }
}

export const GetAllProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        const result = await prisma.productVariant.findMany({});
        return res.status(200).json({result})
    } catch (error) {
       console.log("Error while fetching product variants",error); 
    }
}