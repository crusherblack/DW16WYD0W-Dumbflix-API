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

	const upload = multer({ storage: storage }).single('attache');

	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		next();
	});
};
