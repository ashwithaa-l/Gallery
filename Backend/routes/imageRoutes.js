const router  = require('express').Router();
const {addImage , getImages, getUserimages} = require('../controllers/imagecontroller');
const multer = require('multer');
const { checkUser } = require('../middlewares/auth');


const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
});



const uploads = multer({ storage: storage });

router.post('/uploads',uploads.single('image'),addImage);

router.get('/getImages',checkUser,getImages);

router.get('/getUserimages',checkUser,getUserimages)

module.exports = router;