import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1e9);
        const fileName = file.originalname.split(".")[0];
        cb(null, `${uniqueSuffix}-${fileName}.png`);
    },
});
export const upload = multer({ storage: storage });
