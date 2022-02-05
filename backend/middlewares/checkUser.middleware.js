const {User} = require('../models/models');
const {errorHandler: {badRequest}} = require('../errors');

module.exports = {
    checkUniqueName: async (req, res, next) => {
        try {
            const { name } = req.body;

            const candidate = await User.findOne({ where: { name } });

            if (candidate) {
                return next(badRequest('User is exist!'))
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkFullInput: async (req, res, next) => {
        try {
            const { name } = req.body;
            const { img } = req.files;

            if (!name || !img) {
                return next(badRequest('Add your name and photo.'));
            }

            next();
        } catch (e) {
           next(e);
        }
    }
}
