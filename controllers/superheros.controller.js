const ErrorHandler = require('../errors/errorHandler');
const { CREATED, NOT_FOUND, BAD_REQUEST } = require('../configs/errorCodes.enum');
const { Superhero } = require('../models');
const { fileService } = require('../services');

module.exports = {
    getAllSuperheros: async (req, res, next) => {
        try {
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 3;
            const skip = (page - 1) * limit;

            const superheros = await Superhero.find().skip(skip).limit(limit);

            if (req.query.page) {
                const numSuperheros = await Superhero.countDocuments();
                if (skip >= numSuperheros) throw new ErrorHandler(BAD_REQUEST, 'This page does not exist');
            }

            res
                .json({
                    status: 'success',
                    length: superheros.length,
                    data: {
                        superheros
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    getOneSuperhero: (req, res, next) => {
        try {
            const { superhero } = req;

            if (!superhero) throw new ErrorHandler(NOT_FOUND, 'There is no such superhero in the database');

            res
                .json({
                    status: 'success',
                    data: {
                        superhero
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    createSuperhero: async (req, res, next) => {
        try {
            const { superhero, body } = req;

            if (superhero) throw new ErrorHandler(NOT_FOUND, 'A superhero with such name is already exist');

            let newSuperhero = await Superhero.create({ ...body });

            if (req.files) {
                const { _id } = newSuperhero;
                const { nickname } = newSuperhero;
                const { image } = req.files;
                const folderName = nickname.split(' ').join('-');

                const uploadFile = await fileService.upload(image, 'superheros', folderName);

                newSuperhero = await Superhero.findByIdAndUpdate(_id, { image: uploadFile.Location }, { new: true });
            }

            res
                .status(CREATED)
                .json({
                    status: 'success',
                    data: {
                        newSuperhero
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    updateSuperhero: async (req, res, next) => {
        try {
            const { superhero, body } = req;

            if (!superhero) throw new ErrorHandler(NOT_FOUND, 'There is no such superhero in the database');

            if (req.files) {
                const { nickname, image } = superhero;

                const imageToDelete = image.substr(image.indexOf('/', 8) + 1);
                await fileService.delete(imageToDelete);

                const folderName = nickname.split(' ').join('-');
                const uploadFile = await fileService.upload(req.files.image, 'superheros', folderName);

                body.image = uploadFile.Location;
            }

            const updatedSuperhero = await Superhero.findByIdAndUpdate(superhero._id, body, {
                new: true,
                runValidators: true
            });

            res
                .json({
                    status: 'success',
                    data: {
                        updatedSuperhero
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    deleteSuperheroById: async (req, res, next) => {
        try {
            const { superhero } = req;
            const { _id } = superhero;
            let { image } = superhero;

            image = image.substr(image.indexOf('/', 8) + 1);

            await fileService.delete(image);

            if (!superhero) throw new ErrorHandler(NOT_FOUND, 'There is no such superhero in the database');

            await Superhero.findByIdAndDelete(_id);

            res
                .json({
                    status: 'success',
                    date: null
                });
        } catch (e) {
            next(e);
        }
    },
};
