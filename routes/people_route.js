const express = require("express");

const router = express.Router();

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const peopleCtr = require("../controllers/peopleController");

// ____________________________GETTING_________________________________

// get CheckIn middleware
router.get("/allPeople", peopleCtr.getAllPeople);
router.get("/", peopleCtr.getPeople);

// router.get("/userChecklist", [auth, checklistCtrl.getUserChecklist]);
// router.get("/checklistById", [auth, checklistCtrl.getChecklistById]);
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
router.post("/newName",  peopleCtr.createName);
// router.post('/newCheckOut', [auth,timeCtrl.createCheckOut])

//? ____________________________________UPDATE____________________________________________

router.patch('/approveName',[auth,admin,peopleCtr.updatePeople])
// router.patch('/updateChecks', [auth,checklistCtrl.updateChecks])
// router.patch('/updateRemoveChecklistAssignee', [auth,checklistCtrl.updateRemoveChecklistAssignee])

// router.patch('/acceptCheckOut', [auth,timeCtrl.updateAcceptanceCheckOut])

//! _____________________________________________DELETE_____________________________________

// router.delete('/deleteChecklist', [auth,checklistCtrl.deleteChecklist])

//! Deleting course
router.delete('/deleteName',[auth,admin,peopleCtr.deletePeople])

module.exports = router;
