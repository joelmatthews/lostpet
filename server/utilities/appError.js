class AppError extends Error {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

class LostPetsNotFoundError extends AppError {
    constructor(message) {
        super(message || 'No Pets Found.', 404);
    }
}

module.exports = {
    AppError,
    LostPetsNotFoundError
}