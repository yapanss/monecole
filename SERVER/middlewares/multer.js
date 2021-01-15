require('dotenv').config()
const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
const url = process.env.MONGO_URI;
// const storage = new GridFsStorage({
// 	url,
// 	file: (req, file) => {
// 		return {
// 			bucketName: 'photos',
// 			filename: 'personnel_'+file.originalname+"_"+Date.now()}
// 	}
// });

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'photos');
  },
  filename: (req, file, callback) => {
  	const extension = MIME_TYPES[file.mimetype];
    const name = Date.now();
    callback(null, name + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('photo');