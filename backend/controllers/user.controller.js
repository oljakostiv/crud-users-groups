const uuid = require('uuid').v4();
const path = require('path');
const {User} = require('../models/models');
const {errorHandler: {badRequest, notFound, serverErr}} = require('../errors');

const getImageName = async (img) => {
    const fileName = uuid + '.jpg';
    await img.mv(path.resolve(__dirname, '..', 'static', fileName));
    return fileName;
};

const defaultOrder = [["createdAt", "DESC"]];

class UserController {
    async create(req, res, next) {
        try {
            const { name, groupId } = req.body;
            const { img } = req.files;

            if (!name || !img) {
                throw badRequest('Add your name and photo.');
            }

            const fileName = await getImageName(img);

            const user = await User.create({ name, groupId, img: fileName});

            res.json(user);
        } catch (e) {
            console.error(e);
            next(serverErr(e.message));
        }
    };

    async getAll(req, res, next) {
        try {
            let { groupId, limit, page } = req.query;

            page = page || 1;
            limit = limit || 6;

            let offset = page * limit - limit;
            let users;

            if (!groupId) {
                users = await User.findAndCountAll({ limit, offset, order: defaultOrder });
            }

            if (groupId) {
                users = await User.findAndCountAll({ where: { groupId }, limit, offset, order: defaultOrder });
            }

            return res.json(users);
        } catch (e) {
            next(e);
        }
    };

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                throw notFound('User not found');
            }

            res.json(user);
        } catch (e) {
            next(notFound('User is not found!'));
        }
    };

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { img } = req.files;
            const { name, groupId } = req.body;

            if (!name || !img) {
                throw badRequest('Add your name and photo.');
            }

            const fileName = await getImageName(img);

            await User.update({ name, groupId, img: fileName },
                { where: { id: id }}
            );

            let newUser = await User.findByPk(id);

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    };

    async remove(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                throw notFound('User not found');
            }

            await User.destroy({
                    where: { id: id }
                }
            );

            res.json({ message: 'Deleted' });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
