const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    uid: {
      type: String,
    },

    approved: {
      type: Boolean,
    },
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("People", peopleSchema);
