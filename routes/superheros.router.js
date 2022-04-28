const express = require('express');

const { superherosController } = require('../controllers');
const { superherosMiddleware, filesMiddleware } = require('../middleware');

const router = express.Router();

router.route('/')
    .get(
        superherosController.getAllSuperheros
    )
    .post(
        superherosMiddleware.isSuperheroDataValid,
        filesMiddleware.isImageValid,
        superherosMiddleware.isSuperheroExist('nickname', 'body', 'nickname'),
        superherosController.createSuperhero
    );

router.route('/:superhero_id')
    .get(
        superherosMiddleware.isSuperheroExist('superhero_id', 'params', '_id'),
        superherosController.getOneSuperhero
    )
    .patch(
        superherosMiddleware.isSuperheroExist('superhero_id', 'params', '_id'),
        superherosController.updateSuperhero
    )
    .delete(
        superherosMiddleware.isSuperheroExist('superhero_id', 'params', '_id'),
        superherosController.deleteSuperheroById
    );

module.exports = router;
