import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import uploadToCloudinary from "../utils/cloudinaryUploader";

const prisma = new PrismaClient

interface ProductVariantInterface{
    size: string;
    salePrice?: string;
    price: string;
}

export const CreateProduct = async(req: Request,res: Response):Promise<any> => {
    try {
        
        const { name , categoryId ,description , variants }: {name: string,categoryId: string,description: string,variants:string} = req.body;
        const file = req.files?.thumbnail;
        //console.log("variants",variants);
        const productVariants:ProductVariantInterface[] = JSON.parse(variants);
        //console.log("json variant",productVariants)

        //console.log("Create product file",file)

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

        try {
            productVariants.forEach(async(v) => {
                const result = await prisma.productVariant.create({
                    data:{
                        size:v.size,
                        price:parseInt(v?.price),
                        // salePrice:parseInt(v?.salePrice),
                        productId: productRes.id
                    },
                    select:{
                        id: true,
                    }
                });
            });
        } catch (error) {
            await prisma.product.delete({where:{id: productRes.id}});
            return res.status(410).json({message:"Failed to create product variants"});
        }


        return res.status(200).json({productRes})

    } catch (error) {
        //console.log(error);
        return res.status(499).json({message:"Something wrong during product creation!"});
    }
}

export const UpdateProduct = async(req: Request,res: Response):Promise<any> => {
    try {
        let { ...productData  } = req.body;
        const file = req.files?.thumbnail || null;
        const productId = req.params.productId;

        if(file){
            const uploadRes = await uploadToCloudinary(file,"my-files");
            productData.thumbnail = uploadRes.secure_url;
            //console.log("Product update thumbnail",productData.thumbnail)
        }

        const result = await prisma.product.update({
            where:{
                id:productId
            },
            data: productData,
            select:{
                id: true
            }
        });

        return res.status(200).json({
            result
        })

    } catch (error) {
        //console.log(error);
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
        //console.log(error);
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
       
                //@ts-ignore
        const restaurantId = req.params.restaurantId;
    
        const allProducts = await prisma.product.findMany({
            where:{
                category:{
                    restaurantId: restaurantId
                }
            },
            include:{
               productVariants: true,
               category:{
                  select:{
                    name: true
                  }
               } 
            }
        });

        // //console.log(restaurantId,allProducts)

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
        //console.log(error);
        return res.status(499).json({message:"Something wrong during product retreive!"});
    }
}

export const GetProductByQuery = async(req: Request,res: Response):Promise<any> => {
    try {
        const { search , restaurantId } = req.params;
        const products = await prisma.product.findMany({
            where:{
                name:{
                    contains: search
                },
                category:{
                    restaurantId: restaurantId
                }
            }
        });
        return res.status(200).json({
            products: products
        })
    } catch (error) {
        //console.log(error);
        return res.status(499).json({message:"Something wrong during product retrieve!"});
    }
}

export const GetAllProductsByCategory = async(req: Request,res: Response):Promise<any> => {
    try {
        const {restaurantId} = req.params;
        const products = await prisma.category.findMany({
            where:{
                restaurantId: restaurantId,
            },
            include:{
                products: true
            }
        });
        return res.status(200).json({
            message: "Product fetched successfully!",
            products:products
        })
    } catch (error) {
        //console.log(error);
        return res.status(499).json({message:"Something wrong during product retrieve!"});
    }
}

export const CreateProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        //console.log(req.body)
        const { size , price , salePrice , productId } = req.body;
        if(!size || !price  || !productId)
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
       //console.log("Error while create product variants",error); 
    }
}

export const UpdateProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        const {...updatedData} = req.body;
        const { id } = req.params;
        //console.log(updatedData)
        //console.log(id)

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
       //console.log("Error while update product variants",error); 
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
       //console.log("Error while delete product variants",error); 
    }
}

export const GetAllProductVaraint = async(req: Request,res: Response): Promise<any> => {
    try {
        const result = await prisma.productVariant.findMany({});
        return res.status(200).json({result})
    } catch (error) {
       //console.log("Error while fetching product variants",error); 
    }
}