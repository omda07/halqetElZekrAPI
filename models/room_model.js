const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    khatma:[{ type: mongoose.Schema.Types.ObjectId, ref: "Khatma" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
