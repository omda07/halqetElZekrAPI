const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require:true

    },
    uid: {
      type: String,
      require:true
    },

    approved: {
      type: Boolean,
      default:false
    },
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("People", peopleSchema);
