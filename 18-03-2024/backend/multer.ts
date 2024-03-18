import multer, { Field, diskStorage } from 'multer'
import path from "path";

const storage = diskStorage({
    destination: (req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase();
        if(extname == '.jpg')
            cb(null, './public/images');
        else if(extname == '.pdf')
            cb(null, './public/pdfs');
        else
            cb(null, './public/others');

    },
    filename: (req, file, cb) => {
        const fname = file.originalname;
        cb(null, Date.now() + fname);
    },
});

const upload = multer({ 
    storage,
    limits: { /* 2mb */ fileSize: 2 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else
            cb(new Error("file must be of jpg or jpeg format"));
    }

});

export default upload;

/* const upload = multer({
    dest: '../public/',
}) */

/* const fields: Field[] = [
    {
        name: 'images',
        maxCount: 1,
    },
    {
        name: 'files',
        maxCount: 10
    }
] */

