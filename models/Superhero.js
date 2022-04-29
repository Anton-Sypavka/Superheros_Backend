const { Schema, model } = require('mongoose');

const { SUPERHERO } = require('../configs/dbTables.enum');

const SuperheroSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
    },
    real_name: {
        type: String,
        required: true,
        trim: true,
    },
    origin_description: {
        type: String,
        required: true,
        trim: true,
    },
    superpowers: {
        type: String,
        required: true,
        trim: true,
    },
    catch_phrase: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = model(SUPERHERO, SuperheroSchema);
