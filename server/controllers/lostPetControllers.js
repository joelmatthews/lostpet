const LostPet = require('../models/lostPetModel');
const { LostPetsNotFoundError } = require('../utilities/appError');


// GET all lost pets
module.exports.getAllPets = async (req, res, next) => {
    try {
        const lostPets = await LostPet.find({});
        if (lostPets.length === 0) {
            throw new LostPetsNotFoundError();
        }
        res.status(200).json(lostPets);
    } catch (error) {
        next(error);
    }


};

// GET a single lost pet by ID
module.exports.getLostPetById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const lostPet = await LostPet.findById(id);

        if (!lostPet) {
            throw new LostPetsNotFoundError();
        }
        res.status(200).json(lostPet);

    } catch (error) {
        next(error);
    }
}

// POST to create a single lost pet 
module.exports.createLostPet = async (req, res, next) => {
    try {
        const lostPetData = {
            ...req.body,
        };
        const newLostPet = await LostPet.create(lostPetData);

        res.status(201).json(newLostPet);
    } catch (error) {
        next(error);
    }
}

// PUT to update a single lost pet
module.exports.editLostPet = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedLostPet = await LostPet.findByIdAndUpdate(id, {...req.body}, {returnDocument: 'after'})

        res.status(201).json(updatedLostPet);
    } catch (error) {
        next(error);
    }
}

//DELETE lost pet by id
module.exports.deleteLostPet = async (req, res, next) => {
    try {
        const id = req.params.id;
        const removedLostPet = await LostPet.findByIdAndRemove(id);

        res.status(201).json(removedLostPet);
    } catch (error) {
        next(error);
    }
}