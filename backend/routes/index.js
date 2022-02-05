const routes = require('express').Router();
const groupRouter = require('./group.router');
const userRouter = require('./user.router');

routes.use('/groups', groupRouter);
routes.use('/users', userRouter);

module.exports = routes;
