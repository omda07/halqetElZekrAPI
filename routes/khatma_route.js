const express = require("express");

const router = express.Router();

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const khatmaCtrl = require("../controllers/khatmaController");

// ____________________________GETTING_________________________________

router.get("/allRoom", khatmaCtrl.getRooms);
router.get("/roomById", [auth, khatmaCtrl.getRoomById]);

// get CheckIn middleware
router.get("/allKhatma", khatmaCtrl.getKhatma);
// router.get("/userKhatma", [auth, khatmaCtrl.getUserKhatma]);
router.get("/khatmaById", [auth, khatmaCtrl.getKhatmaById]);
// get CheckOut middleware
// router.get('/allCheckOut',timeCtrl.getCheckOut)

// // get CheckIn middleware
// router.get('/allCheckInRequests',[admin,timeCtrl.getCheckInRequest])
// // get CheckOut middleware
// router.get('/allCheckOutRequests',[admin,timeCtrl.getCheckOutRequest])

// // get time middleware
// router.get('/getCheckIn/:date',timeCtrl.getByDateCheckIn)
// // get time middleware
// router.get('/getCheckOut/:date',timeCtrl.getByDateCheckOut)

//* ________________________________CREATE_________________________________________

// Creating one Course
router.post("/newKhatma",  khatmaCtrl.createKhatma);

//* _________________________________CREATE ROOM____________________________________________
router.post("/newRoom",  khatmaCtrl.createRoom);

// router.post('/newCheckOut', [auth,timeCtrl.createCheckOut])

//? ____________________________________UPDATE____________________________________________

router.patch('/updateRoom', [khatmaCtrl.updateRoom])
router.patch('/updateJuz', [khatmaCtrl.updateJuz])

router.patch('/updateRemoveKhatmaAssignee', [auth,khatmaCtrl.updateRemoveKhatmaAssignee])

// router.patch('/acceptCheckOut', [auth,timeCtrl.updateAcceptanceCheckOut])

//! _____________________________________________DELETE_____________________________________

router.delete('/deleteKhatma', [auth,khatmaCtrl.deleteKhatma])

//! Deleting course

module.exports = router;
