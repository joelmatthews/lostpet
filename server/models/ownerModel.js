const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
  Address: {
    street: String,
    addressLine2: String,
    city: String,
    state: String,
    zipcode: Number,
  },
  lostPets: [{ 
    type: Schema.Types.ObjectId,
    ref: 'LostPet'
  }]
});

const Owner = new mongoose.model("Owner", ownerSchema);

module.exports = Owner;
