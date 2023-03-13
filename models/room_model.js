const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    imageUrl:{
      type: String,
      default:"https://res.cloudinary.com/halqetelzekr/image/upload/v1678663005/placeholder_gqi3pm.jpg"
    },
    cloudinary_id: { type: String, },

    khatma:[{ type: mongoose.Schema.Types.ObjectId, ref: "Khatma" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
