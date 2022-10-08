const multer = require("multer")

const FILE_TYPE_MAP = {
	'image/png':'png',
	'image/jpeg':'jpeg',
	'image/jpg':'jpg'
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const isValid = FILE_TYPE_MAP[file.mimetype];
		let uploadError = new Error('invalid image type');
  
		if(isValid) {
			uploadError = null
		}
	  cb(uploadError, 'public/uploads')
	},
	filename: function (req, file, cb) {
		
	  const fileName =Date.now() + '-'+ file.originalname.split(' ').join('-');
	  cb(null, fileName)
	}
  })
  
  const upload = multer({ storage : storage})

  module.exports = { upload }