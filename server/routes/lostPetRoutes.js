const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const { storage } = require("../utilities/cloudinary");

const upload = multer({ storage: storage })

const secret = process.env.JWT_SECRET;

const {
  getAllPets,
  getLostPetById,
  createLostPet,
  editLostPet,
  deleteLostPet,
} = require("../controllers/lostPetControllers");
const { isOwner } = require("../middleware/isLostPetOwner");
const { validateLostPet } = require("../middleware/lostPetValidation");



router.get("/", getAllPets);

router.get("/:id", getLostPetById);

//verifys JWT & passes decoded token to req.auth along with payload
router.use(
  jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({ path: ["/", "/:id"] })
);

//verifys that the currently authenticated user is the owner of the document that is to be modified by the route endpoint
router.use(["/:id/edit", "/:id/delete"], isOwner);

router.post("/new", upload.array('images', 3), validateLostPet, createLostPet);

router.put("/:id/edit", upload.array('images', 3), validateLostPet, editLostPet);

router.delete("/:id/delete", deleteLostPet);

module.exports = router;
