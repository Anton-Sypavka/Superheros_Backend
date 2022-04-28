const { BAD_REQUEST } = require('../configs/errorCodes.enum');
const ErrorHandler = require('../errors/errorHandler');
const { Superhero } = require('../models');
const { superheroValidator: { createSuperheroValidator } } = require('../validators');

module.exports = {
    isSuperheroDataValid: async (req, res, next) => {
        try {
            const { body } = req;

            const { error } = await createSuperheroValidator.validate(body);

            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

            next();
        } catch (e) {
            next(e);
        }
    },

    isSuperheroExist: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            req.superhero = await Superhero.findOne({ [dbField]: value });

            next();
        } catch (e) {
            next(e);
        }
    }
};
