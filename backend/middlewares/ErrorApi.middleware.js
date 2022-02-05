const { errorHandler } = require('../errors');

module.exports = function (err, req, res, next) {
    if (err instanceof errorHandler) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Unforeseen error' });
}
