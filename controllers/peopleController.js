const People = require("../models/people_model");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const peopleCtr = {
  // * _________________________________GET FUNCTION_____________________________________________

  getAllPeople: async (req, res, next) => {
    let people;
    try {
      people = await People.find({approved:true}).select("-__v");
      if (!people) {
        return res
          .status(404)
          .json({ status: false, message: "Cannot find people" });
      }

      return res
        .status(200)
        .json({ status: true, message: "Success", peoples: people });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
 

  // * ______________________________________CREATE FUNCTION__________________________

  createName: async (req, res, next) => {

    let newName;
    try {
  
      const orders = new People({
     name:req.body.name,

      });

      newName = await orders.save();

      getAllPeople = await People.findOne({_id:ObjectId(newName.id)} )
      
      .select("-__v");
      // res.newtime = newtime
      return res
        .status(201)
        .json({ status: true, message: "Success", People: getAllPeople});
    } catch (err) {
      console.log(err);
      return res.status(400).json({ status: false, message: err });
    }
  },

  // ? ______________________________________UPDATE FUNCTION_____________________________

  updatePeople: async (req, res) => {
    const { id, name, assign } = req.body;
    try {

      const check = await People.findById(ObjectId(id));


      if (check) {
      
          const result = await People.updateOne(
            {
              _id: req.body.id,
            },
            {
              $set: {
                approved:true,
              },
            }
          );
          console.log(result);
          return res.json({ status: true, message: "Accepted" });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  

  updateChecks: async (req, res) => {
    const { id, checksId } = req.body;
    const token = req.header("x-auth-token");
    try {
      const user = jwt.verify(token, "privateKey");

      const check = await People.findById(ObjectId(id));
   

      if (check) {
        const   result = await People.updateOne(
          {
            _id:req.body.id,
            "checks": { "$elemMatch": { "_id":  req.body.checksId  }}
            // "checks._id": req.body.checksId ,
          },
          {
            $set: {
              "checks.$.ckecked": req.body.ckecked
              // checks: {
                
              //   ckecked: req.body.ckecked,
              // },
            },
          }
        );
        console.log(result);
        return res.json({ status: true, message: "Accepted" });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  updateRemovePeopleAssignee: async (req, res) => {
    const { id, assign } = req.body;
    const removeAssignee = req.query.removeAssignee;
    const addAssigne = req.query.addAssigne;
    const addChecks = req.query.addChecks;
    const updateCheck = req.query.updateCheck;
    const removeChecks = req.query.removeChecks;

    const token = req.header("x-auth-token");
    try {
      const user = jwt.verify(token, "privateKey");

      const check = await People.findById(ObjectId(id));

      let result;
      if (check) {
        if (check.reporter == user.id) {
          if (removeAssignee == "true") {
            result = await People.updateOne(
              {
                _id: req.body.id,
              },
              {
                $pull: {
                  assignee: req.body.assign,
                },
              }
            );
          } else if (addChecks == "true") {
            console.log(req.body.title);
            result = await People.updateOne(
              {
                _id: req.body.id,
              },
              {
                $push: {
                  checks: {
                    title: req.body.title,
                    description: req.body.description,
                    ckecked: req.body.ckecked,
                  },
                },
              }
            );
          }else if (updateCheck ==  'true'){
            const   result = await People.updateOne(
              {
                _id:req.body.id,
                "checks": { "$elemMatch": { "_id":  req.body.checksId  }}
                // "checks._id": req.body.checksId ,
              },
              {
                $set: {
                  "checks.$.ckecked": req.body.ckecked
                  // checks: {
                    
                  //   ckecked: req.body.ckecked,
                  // },
                },
              }
            );
          } else if (removeChecks == "true") {
            console.log(req.body.title);
            result = await People.updateOne(
              {
                _id: req.body.id,
              },
              {
                $pull: {
                  checks: {
                    _id: req.body.checksId,
                  },
                },
              }
            );
          } else if (addAssigne == "true") {
            result = await People.updateOne(
              {
                _id: req.body.id,
              },
              {
                $push: {
                  assignee: req.body.assign,
                },
              }
            );
          }

          console.log(result);
          return res.json({ status: true, message: "Accepted" });
        } else {
          return res
            .status(403)
            .json({ status: false, message: "You are not allowed" });
        }
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  // ! __________________________________________DELETE FINCTION____________________________

  deletePeople: async (req, res) => {
    const { id } = req.body;
    try {
      const check = await People.findById(ObjectId(id));
      if (check) {
        const result = await People.deleteOne({
          _id: req.body.id,
        });
        console.log(result);
        return res.json({ status: true, message: "Deleted" });
      } else {
        return res.status(404).json({ status: false, message: "Not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  },
};
module.exports = peopleCtr;
