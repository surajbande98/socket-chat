

class UtilityService {

    static handleGlobalError(error, res) {
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(status).json({ message: message, data: data });
    }

    static throwError(errors) {
        const error = new Error("Validation failed!!!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
}

module.exports = UtilityService;

