const LostPet = require('../models/lostPetModel');

const { NotOwnerError } = require('../utilities/appError');


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    try {
        const lostPet = await LostPet.findById(id);

        if (lostPet.owner && lostPet.owner.equals(req.auth.owner.id)) {
            return next();
        }
        throw new NotOwnerError();
    } catch (error) {
        console.log(error);
        next(error);
    }
};