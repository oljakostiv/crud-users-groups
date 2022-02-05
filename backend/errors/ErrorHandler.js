class ErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ErrorHandler(400, message)
    };

    static forbidden(message) {
        return new ErrorHandler(403, message)
    };

    static notFound(message) {
        return new ErrorHandler(404, message)
    };

    static serverErr(message) {
        return new ErrorHandler(500, message)
    }
}

module.exports = ErrorHandler;
