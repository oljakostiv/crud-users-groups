const routes = require('express').Router();
const {
    groupController:
        { create, getAll, getById, update, remove }
} = require('../controllers');

routes.post('/', create);
routes.get('/', getAll);
routes.get('/:id', getById);
routes.put('/:id', update);
routes.delete('/:id', remove);

module.exports = routes;
