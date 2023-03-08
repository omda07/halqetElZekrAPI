const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const khatmaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    juzes: [
      {
        juz: {
          type: Number,
          require: true,
        },
        checked: {
          type: Boolean,
          default: false,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    finished:{type:Boolean,default:false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Khatma", khatmaSchema);
