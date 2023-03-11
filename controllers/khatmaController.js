const Khatma = require("../models/khatma_model");
const Room = require("../models/room_model");


const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const khatmaCtrl = {
  // * _________________________________GET FUNCTION_____________________________________________

  getKhatma: async (req, res, next) => {
    companyId = req.query.companyId;
    let time;

    try {
      let count = await Khatma.count();

      time = await Khatma.find().select("-__v -juzes");
      if (!time) {
        return res
          .status(404)
          .json({ status: false, message: "Cannot find Khatmas" });
      }

      return res
        .status(200)
        .json({
          status: true,
          message: "Success",
          Khatma: time,
          count: count,
        });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  getKhatmaById: async (req, res, next) => {
    const token = req.header("x-auth-token");
    const KhatmaId = req.query.KhatmaId;

    try {
      let count = await Khatma.count();
      let checked = await Khatma.findOne({ _id: ObjectId(KhatmaId)}).count({ "juzes.checked": true });
 


      time = await Khatma.findOne({ _id: ObjectId(KhatmaId) })
        .populate("juzes.user", "-__v -email -password -isAdmin -noId")
        .select("-__v");

        
        if (checked === 30) {
          time.finished = true;
        }
      if (!time) {
        return res
          .status(404)
          .json({ status: false, message: "Cannot find Khatmas" });
      }

      return res.status(200).json({
        status: true,
        message: "Success",
        Khatma: time,
        length: 30,
        checkedCount: checked,
      });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  getRooms: async (req, res, next) => {
    companyId = req.query.companyId;
    let time;

    try {
      let count = await Room.count();

      time = await Room.find().select("-__v -users -khatma");
      if (!time) {
        return res
          .status(404)
          .json({ status: false, message: "Cannot find Rooms" });
      }

      return res
        .status(200)
        .json({
          status: true,
          message: "Success",
          room: time,
          count: count,
        });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  getRoomById: async (req, res, next) => {
    const token = req.header("x-auth-token");
    const roomId = req.query.roomId;

    try {

      time = await Room.findOne({ _id: ObjectId(roomId) })
   .populate('khatma users','-__v -juzes -password')
        .select("-__v");


      if (!time) {
        return res
          .status(404)
          .json({ status: false, message: "Cannot find Rooms" });
      }

      return res.status(200).json({
        status: true,
        message: "Success",
        room: time,
        khatmaCount: time.khatma.length,
      });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
  // * ______________________________________CREATE FUNCTION__________________________

  createRoom: async (req, res, next) => {
    const token = req.header("x-auth-token");
    const ownKhatma = req.body.own;

    let newOrder;
    try {
      const user = jwt.verify(token, "privateKey");
      const id = user.id;
      console.log(id);

      const orders = new Room({
        name: req.body.name,
        users: id,
      });

      newOrder = await orders.save();

      // const getKhatma = await Khatma.findOne({ _id: ObjectId(newOrder.id) })
      //   .populate("user", "-__v")
      //   .select("-__v");
      // res.newtime = newtime
      return res
        .status(201)
        .json({ status: true, message: "Success", room: newOrder });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ status: false, message: err });
    }
  },

  createKhatma: async (req, res, next) => {
    const token = req.header("x-auth-token");
    const roomId = req.body.roomId;
    let newOrder;
    try {
      const user = jwt.verify(token, "privateKey");
      const id = user.id;
      console.log(id);

      const quran = [];

      for (let i = 0; i < 30; i++) {
        quran.push({
          juz: i + 1,
        });
      }
      console.log(quran);

      const orders = new Khatma({
        name: req.body.name,
        juzes: quran,
      });

      newOrder = await orders.save();
      const checkRoom = await Room.findById(ObjectId(roomId));
      if (checkRoom) {
        const result = await Room.updateOne(
          {
            _id: roomId,
            // khatma: { $elemMatch: { _id: req.body.khatmaId } },
            // "checks._id": req.body.checksId ,
          },
          {
            $push: {
              "khatma": newOrder._id,
              // checks: {

              //   ckecked: req.body.ckecked,
              // },
            },
          }
        );
        console.log(result);
        
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
      // const getKhatma = await Khatma.findOne({ _id: ObjectId(newOrder.id) })
      //   .populate("user", "-__v")
      //   .select("-__v");
      // res.newtime = newtime
      return res
        .status(201)
        .json({ status: true, message: "Success", Khatma: newOrder });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ status: false, message: err });
    }
  },

  // ? ______________________________________UPDATE FUNCTION_____________________________




  // updateChecks: async (req, res) => {
  //   const { id,checksId } = req.body;
  //   const token = req.header("x-auth-token");
  //   try {
  //     const user = jwt.verify(token, "privateKey");

  //     const check = await Khatma.findById(ObjectId(id));

  //     for(let i =0 ; i<check.checks.length;i++){
  //      const checks = check.checks[i]
  //      if(checks._id == checksId){
  //        console.log(checks)

  //        if (check) {
  //         if (check.reporter == user.id) {
  //           const result = await Khatma.updateOne(
  //             {
  //               _id: req.body.checksId,
  //             },
  //             {
  //               $set: {

  //                 title: req.body.title,
  //                 description: req.body.description,
  //                 ckecked: req.body.ckecked,
  //               },
  //             }
  //           );
  //           console.log(result);
  //           return res.json({ status: true, message: "Accepted" });
  //         } else {
  //           return res
  //             .status(403)
  //             .json({ status: false, message: "You are not allowed" });
  //         }
  //       } else {
  //         return res.status(404).json({ status: false, message: "not found" });
  //       }
  //      }

  //     }

  //   } catch (error) {
  //     return res.status(400).json({ status: false, message: error.message });
  //   }
  // },

  updateJuz: async (req, res) => {
    const { id, juzId } = req.body;
    const checkDone = req.query.checkDone;
    const token = req.header("x-auth-token");
    try {
      const user = jwt.verify(token, "privateKey");

      const check = await Khatma.findById(ObjectId(id));

      if (check) {
        if(checkDone === 'true'){
          const result = await Khatma.updateOne(
            {
              _id: req.body.id,
              juzes: { $elemMatch: { _id: req.body.juzId } },
              // "checks._id": req.body.checksId ,
            },
            {
              $set: {
                "juzes.$.user": user.id,
                // checks: {
  
                //   ckecked: req.body.ckecked,
                // },
              },
            }
          );
        
          return res.status(200).json({ status: true, message: "Accepted" });
        }else if(checkDone === 'false'){
          const result = await Khatma.updateOne(
            {
              _id: req.body.id,
              juzes: { $elemMatch: { _id: req.body.juzId } },
              // "checks._id": req.body.checksId ,
            },
            {
              $set: {
                "juzes.$.user": user.id,
                // checks: {
  
                //   ckecked: req.body.ckecked,
                // },
              },
            }
          );
    
          return res.status(200).json({ status: true, message: "Accepted" });
        }else{
          return res.status(400).json({ status: true, message: "حدث خطأ" });

        }
      
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  
  updateRoom: async (req, res) => {
    const { id, juzId } = req.body;
    const token = req.header("x-auth-token");
    try {
      const user = jwt.verify(token, "privateKey");

      const check = await Room.findById(ObjectId(id));

      console.log(user.id);
      if (check) {
        const result = await Room.updateOne(
          {
            _id: id,
            // juzes: { $elemMatch: { _id: req.body.juzId } },
            // "checks._id": req.body.checksId ,
          },
          {
            $addToSet: {
              "users": user.id,
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

  updateRemoveKhatmaAssignee: async (req, res) => {
    const { id, assign } = req.body;
    const removeAssignee = req.query.removeAssignee;
    const addAssigne = req.query.addAssigne;
    const addChecks = req.query.addChecks;
    const updateCheck = req.query.updateCheck;
    const removeChecks = req.query.removeChecks;

    const token = req.header("x-auth-token");
    try {
      const user = jwt.verify(token, "privateKey");

      const check = await Khatma.findById(ObjectId(id));

      let result;
      if (check) {
        if (check.reporter == user.id) {
          if (removeAssignee == "true") {
            result = await Khatma.updateOne(
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
            result = await Khatma.updateOne(
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
          } else if (updateCheck == "true") {
            const result = await Khatma.updateOne(
              {
                _id: req.body.id,
                checks: { $elemMatch: { _id: req.body.checksId } },
                // "checks._id": req.body.checksId ,
              },
              {
                $set: {
                  "checks.$.ckecked": req.body.ckecked,
                  // checks: {

                  //   ckecked: req.body.ckecked,
                  // },
                },
              }
            );
          } else if (removeChecks == "true") {
            console.log(req.body.title);
            result = await Khatma.updateOne(
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
            result = await Khatma.updateOne(
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

  deleteKhatma: async (req, res) => {
    const { id } = req.body;
    const token = req.header("x-auth-token");
    try {
      const check = await Khatma.findById(ObjectId(id));
      const user = jwt.verify(token, "privateKey");
      if (check) {
        if (check.reporter == user.id) {
          const result = await Khatma.deleteOne({
            _id: req.body.id,
          });
          console.log(result);
          return res.json({ status: true, message: "Deleted" });
        } else {
          return res
            .status(403)
            .json({ status: false, message: "You are not allowed" });
        }
      } else {
        return res.status(404).json({ status: false, message: "Not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  },
};
module.exports = khatmaCtrl;
