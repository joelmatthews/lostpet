const express = require('express');
const router = express.Router();

const { getAllPets, getLostPetById, createLostPet, editLostPet, deleteLostPet } = require('../controllers/lostPetControllers');

router.get('/', getAllPets);

router.get('/:id', getLostPetById);

router.post('/new', createLostPet);

router.put('/:id/edit', editLostPet);

router.delete('/:id/delete', deleteLostPet);

module.exports = router;