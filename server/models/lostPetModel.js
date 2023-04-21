const mongoose = require("mongoose");
const { Schema } = mongoose;
const Owner = require("./ownerModel");

const LastLocationSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

LastLocationSchema.index({ coordinates: "2dsphere" });

const lostPetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateLost: {
      type: Date,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    lastLocation: {
      type: LastLocationSchema,
      required: true
    },
  },
  { timestamps: true }
);

lostPetSchema.post("findOneAndRemove", async (doc) => {
  console.log("triggered mongoose middleware!");
  try {
    if (doc) {
      const owner = await Owner.findById(doc.owner);
      if (owner) {
        const index = owner.lostPets.indexOf(doc._id);
        if (index !== -1) {
          owner.lostPets.splice(index, 1);
          await owner.save();
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const LostPet = new mongoose.model("LostPet", lostPetSchema);

module.exports = LostPet;
