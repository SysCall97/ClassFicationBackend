import { uploadType } from '../helpers/types';
import multer from 'multer';
import path from 'path';
import { getRandomString } from '../helpers/randomStringGenerator';

const UPLOAD_FOLDER = `${process.cwd()}/public/`;

export const multerGetter = (type = uploadType.assignment) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FOLDER + type);
        },
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const assignmentCode = getRandomString(10);
            const assignmentname = `${type}-${assignmentCode}${fileExtension}`;
            if(type === uploadType.assignment) req.body.assignmentCode = assignmentCode;
            else if(type === uploadType.submission) req.body.submissionCode = assignmentCode;
            cb(null, assignmentname);
        }
    });

    const upload = multer({
        storage: storage,
        limits: {
            fieldSize: 300000, //300kB
        },
        fileFilter: (req, file, cb) => {
            const allowedTypes = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
    
            if(allowedTypes.includes(file.mimetype)) {
                cb(null, true);
                // const type = req.body.type;
                // if(type === uploadType.assignment || type === uploadType.submission) cb(null, true);
                // else cb(new Error("Type not matched"));
            } else {
                cb(null, false);
            }
        }
    });

    return upload;
}

