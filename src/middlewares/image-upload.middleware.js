import 'dotenv/config';
import multer from 'multer';
import multerS3 from 'multer-s3';

import path from 'path';

import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_SECRET_KEY,
} from '../constants/env.constant.js';

// const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
});
const imageUploader = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now().toString()}${ext}`;
      console.log(fileName);
      cb(null, `image/${fileName}`);
    },
  }),
});

export default imageUploader;
