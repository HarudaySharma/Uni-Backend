import multer, { diskStorage } from "multer";

type MIME_FILE_TYPE_KEYS = 'image/png'| 'image/jpeg'| 'image/jpg';

const MIME_FILE_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const upload = multer({
    fileFilter: (req, file, cb) => {
        console.log('in upload');
        console.log(file);
        const ext = MIME_FILE_TYPE[file.mimetype as MIME_FILE_TYPE_KEYS];
        if(!ext){
            cb(new Error('invalid file type'));
        }
        cb(null, true);
    },
    storage: diskStorage({
        filename: (req, file, cb) => {
            cb(null, `${new Date().getTime()}${file.originalname}`);
        },
        destination: (req, file, cb) => {
            cb(null, 'public/gallery');
        }
    }),
});

export default upload;
