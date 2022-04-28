const { BAD_REQUEST } = require('../configs/errorCodes.enum');
const ErrorHandler = require('../errors/errorHandler');
const { MAX_IMAGE_SIZE } = require('../configs/constants');

module.exports = {
    isImageValid: (req, res, next) => {
        try {
            if (!req.files || !req.files.image) {
                throw new ErrorHandler(BAD_REQUEST, 'Image is required');
            }

            const { image } = req.files;
            const { name, size } = image;

            if (size > MAX_IMAGE_SIZE) throw new ErrorHandler(BAD_REQUEST, `File ${name} is to large!`);

            next();
        } catch (e) {
            next(e);
        }
    }
};
