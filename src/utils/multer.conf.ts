import { diskStorage } from 'multer';
import { join } from 'path';

export const myStorage = diskStorage({
  // specify file destination
  destination: (req, file, callback) => {
    callback(null, join(process.cwd(), 'uploads'));
  },
  // Specify the file name
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname.replace(/\s/g, ''));
  },
});