import multer, { diskStorage } from "multer";
import path from "path";

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./static")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

export const upload = multer({ 
    storage: fileStorageEngine
})