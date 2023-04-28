const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lostPets: [
      {
        type: Schema.Types.ObjectId,
        ref: "LostPet",
      },
    ],
  },
  { timestamps: true }
);

const Owner = new mongoose.model("Owner", ownerSchema);

module.exports = Owner;
