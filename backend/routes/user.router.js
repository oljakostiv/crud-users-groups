const routes = require('express').Router();
const {
    userController:
        { create, getAll, getById, update, remove }
} = require('../controllers');
const {
    checkMiddleware: {
        checkUniqueName, checkFullInput
    }
} = require('../middlewares');

routes.post('/', checkUniqueName, checkFullInput, create);
routes.get('/', getAll);
routes.get('/:id', getById);
routes.put('/:id', update);
routes.delete('/:id', remove);

module.exports = routes;
