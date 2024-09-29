import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { UploadApiResponse } from 'cloudinary';
import { Resolver } from 'dns';


@Injectable()
export class CloudinaryService {
    constructor() {
            
            cloudinary.config({
            cloud_name: "dmcxpeybj",
            api_key: "285968531837913",
            api_secret: "GQ9XjZDuCJTahMpZklqAPb1-NAI",
            });
        
        }


        getMulterStorage() {
            const storage = multer.memoryStorage();
            return multer({ storage });
        }

        async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'Veterinaria',
                        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
                        public_id: `${Date.now()}-${file.originalname}`,
                    },
                    (error, result) => {
                        if(error){
                            reject(error);
                        } else {
                            resolve(result)
                        }
                    }
                );
                uploadStream.end(file.buffer)
            });
        }
}
