const router  = require('express').Router();
const {addImage} = require('../controllers/imagecontroller');
const multer = require('multer');
const { checkUser } = require('../middlewares/auth');


const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
});



const uploads = multer({ storage: storage });

router.post('/addImage',checkUser,uploads.single('image'),addImage);

module.exports = router;