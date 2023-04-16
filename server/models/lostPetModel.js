const mongoose = require("mongoose");
const { Schema } = mongoose;

const lostPetSchema = new Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
  lastLocation: {
    street: String,
    city: String,
    state: String,
    zipcode: Number,
  },
});

const LostPet = new mongoose.model("LostPet", lostPetSchema);

module.exports = LostPet;
