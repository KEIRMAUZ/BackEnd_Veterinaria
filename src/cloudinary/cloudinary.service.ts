import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
    export class CloudinaryService {
    constructor() {
        cloudinary.config({
        cloud_name: 'dmcxpeybj',
        api_key: '285968531837913',
        api_secret: 'GQ9XjZDuCJTahMpZklqAPb1-NAI',
        });
    }

    getMulterStorage() {
        return multer.memoryStorage(); // Usar almacenamiento en memoria
    }

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
            reject(error);
            } else {
            resolve(result);
            }
        });

        // Enviar el archivo al stream de Cloudinary
        uploadStream.end(file.buffer);
        });
    }
}
