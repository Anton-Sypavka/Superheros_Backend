const Joi = require('joi');

const createSuperheroValidator = new Joi.object({
    nickname: Joi
        .string()
        .min(3)
        .trim()
        .required(),

    real_name: Joi
        .string()
        .min(3)
        .trim()
        .required(),

    origin_description: Joi
        .string()
        .min(15)
        .trim()
        .required(),

    superpowers: Joi
        .string()
        .min(10)
        .trim()
        .required(),

    catch_phrase: Joi
        .string()
        .min(5)
        .trim()
        .required(),
});

module.exports = {
    createSuperheroValidator,
};
