var multer = require('multer');

exports.upload = async (req, res, next) => {
	var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'uploads');
		},
		filename: function(req, file, cb) {
			cb(null, Date.now() + '-' + file.originalname);
		}
	});

	const imageFilter = function(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
			req.fileValidationError = {
				message: 'Only image files are allowed!'
			};
			return cb(new Error('Only image files are allowed!'), false);
		}
		cb(null, true);
	};

	const maxSize = 2 * 1000 * 1000;

	const upload = multer({
		storage,
		fileFilter: imageFilter,
		limits: { fileSize: maxSize }
	}).single('attache');

	upload(req, res, function(err) {
		if (req.fileValidationError) return res.send(req.fileValidationError);

		if (!req.file && !err)
			return res.send({
				message: 'Please select an image to upload'
			});

		if (err) {
			if (err.code === 'LIMIT_FILE_SIZE') {
				return res.send({
					message: 'Max file sized 2MB'
				});
			}
			return res.send(err);
		}

		next();
	});
};
