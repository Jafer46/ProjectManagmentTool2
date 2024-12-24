import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './files',
  filename: (req, file, callback) => {
    const name = file.originalname.split('.');
    const ext = extname(file.originalname);
    const filename = `${name[0]}_${Date.now()}${ext}`;
    callback(null, filename);
  },
});
