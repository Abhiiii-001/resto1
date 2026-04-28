import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import uploadToCloudinary from "../utils/cloudinaryUploader";

const prisma = new PrismaClient();
export const AddCategory = async(req: Request,res: Response): Promise<any> => {
    try {

        //Get all requried data
        const { name } : {name: string}= req.body;
        const thumbnail = req.files?.thumbnail;
        //console.log(name,thumbnail);
        //@ts-ignore
        const restaurantId = req.user.restaurantId;

        //check if anyone is null
        if(!name || !restaurantId || !thumbnail) 
            return res.status(402).json({message: "All fields requried!"});

        //update thumbanil to cloudinary
        const uploadFileRes =  await uploadToCloudinary(thumbnail,"my-files");

        const currentTime = new Date(Date.now()).toISOString();

        //create entry
        const result = await prisma.category.create({
            data:{
                name: name,
                thumbnail: uploadFileRes?.secure_url,
                restaurantId: restaurantId,
                createdAt: currentTime
            }
        });

        return res.status(200).json({message: "Category created!"});


    } catch (error) {
         //console.log(error);
         return res.status(499).json({message:"Something wrong during category creation!"});
    }
}

export const RemoveCategory = async(req: Request,res: Response): Promise<any> => {
    try {
        const { categoryId } = req.params;
        if(!categoryId) return res.status(402).json({message:"Empty category id"});

        const categoryRes = await prisma.category.delete({
            where:{
                id: categoryId
            }
        });

        return res.status(200).json({message: "Category deleted!"})

    } catch (error) {
        //console.log(error);
        return res.status(499).json({message:"Something wrong during category deletion!"});
   }

}

export const UpdateCategory = async(req: Request,res: Response): Promise<any> => {
    try {
        let updatedData = req.body;
        const thumbanil = req.files?.thumbanil;
        const { categoryId } = req.params;

        if(thumbanil){
            const thumbnailUploadRes = await uploadToCloudinary(thumbanil,"my-files"); 
            updatedData.thumbanil = thumbnailUploadRes?.secure_url;
        }
        console.log('debug-cate', thumbanil, updatedData)
        const result = await prisma.category.update({
            where:{
                id: categoryId
            },
            data:updatedData
        });

        return res.status(200).json({message: "Category updated!",result: result});
    } catch (error) {
        //console.log(error);
        return res.status(499).json({message:"Something wrong during category updation!"});
   }

}

export const GetAllCategories = async(req: Request,res: Response): Promise<any> => {
    try {
        //@ts-ignore
        const restaurantId = req.user.restaurantId;
        const categories = await prisma.category.findMany({
            where:{
                restaurantId: restaurantId
            },
            select:{
                name: true,
                id: true,
                thumbnail: true
            }
        });
        return res.status(200).json({categories});

    } catch (error) {
        //console.log(error);
        return res.status(499).json({message:"Something wrong during category retrive!"});
   }
}

export const GetAllCategoriesWithProducts = async(req: Request,res: Response):Promise<any> => {
    try {

        //@ts-ignore
        const restaurantId = req.params.id;
        const categories = await prisma.category.findMany({
            where:{
                restaurantId: restaurantId
            },
            select:{
                name: true,
                id: true,
                thumbnail: true,
                products:{
                    include:{
                        productVariants: true
                    }
                }
            },
        });
        return res.status(200).json({
            success: false,
            message:"All category retrived successfully",
            data: categories
        });

        
    } catch (error) {
         //console.log("Get all categories with product error",error);
         return res.status(499).json({
            success: false,
            message:"Something wrong during all data retrieve"
         })
    }
}