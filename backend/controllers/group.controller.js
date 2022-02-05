const {Group} = require('../models/models');
const {errorHandler: {notFound, serverErr}} = require('../errors');

class GroupController {
    async create(req, res, next) {
        try {
            const { name, description } = req.body;

            const group = await Group.create({ name, description });

            res.json(group);
        } catch (e) {
            console.error(e);
            next(serverErr(e.message));        }
    };

    async getAll(req, res, next) {
        try {
            const groups = await Group.findAll();
            res.json(groups);
        } catch (e) {
            next(e);
        }
    };

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const group = await Group.findByPk(id);

            res.json(group);
        } catch (e) {
            next(notFound('Group is not found!'));
        }
    };

    async update(req, res, next) {
        try {
            const { id } = req.params;

             await Group.update(req.body, { where:
                     { id: id }
            });

            let newGroup = await Group.findByPk(id);

            res.json(newGroup);
        } catch (e) {
            next(e);
        }
    };

    async remove(req, res, next) {
        try {
            const { id } = req.params;

            await Group.destroy({
                where: { id: id }}
            );

            res.json({ message: 'Deleted' });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new GroupController();