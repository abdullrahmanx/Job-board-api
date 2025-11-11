import { BadRequestException, Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary'



@Injectable()
export class CloudinaryService {
    allowedMimeTypes= [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ] 

    async uploadFile(file: Express.Multer.File, folder: string) {
       if(!file) {
        throw new BadRequestException('No file uploaded')
       }
       if(!this.allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid fiel mimetype allowed mimetypes:
            ${this.allowedMimeTypes.join(',')}`)
       }

      return new Promise((resolve,reject) => {
        cloudinary.uploader.upload_stream({folder}, (error,result) => {
            if (error) return reject(new BadRequestException('Error uploading file'));
            resolve(result)
        })
        .end(file.buffer)
      })
    }  
    async deleteFile(id: string) {
        await cloudinary.uploader.destroy(id)
    }

}
