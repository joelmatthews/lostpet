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

class NotOwnerError extends AppError {
    constructor(message) {
        super(message || 'You are not the owner of this Lost Pet', 403)
    }
}

class MaxImageUploadsError extends AppError {
    constructor(message) {
        super(message || 'You cannot have more than three images uploaded!', 400)
    }
}

module.exports = {
    AppError,
    LostPetsNotFoundError,
    NotOwnerError,
    MaxImageUploadsError
}