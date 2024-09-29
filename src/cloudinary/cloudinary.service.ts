import { Injectable } from '@nestjs/common';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { UploadApiResponse } from 'cloudinary';


@Injectable()
export class CloudinaryService {
    private storage: CloudinaryStorage;
    constructor() {
            // Configura Cloudinary con tus credenciales
            cloudinary.config({
            cloud_name: "dmcxpeybj",
            api_key: "285968531837913",
            api_secret: "GQ9XjZDuCJTahMpZklqAPb1-NAI",
            });
        
            
            this.storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file) => {
                return {
                    folder: 'Veterinaria',  
                    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],  
                    public_id: `${Date.now()}-${file.originalname}`, 
                };
            },
            });
        }


        getMulterStorage() {
            return multer({ storage: this.storage });
        }

        async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: 'Veterinaria' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }).end(file.buffer); 
            });
        }
}
