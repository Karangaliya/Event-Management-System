import { Router } from "express";
import { getAllVolenteer, getVolenteer, loginUser, logOutUser, registerUser, updateProfileImage,updateDetails, deleteVol } from "../controllers/volenteers.controller.js";
import verifyJWTV from "../middleware/verifyJwtVolenteers.js";
import { upload } from "../middleware/upload.middleware.js";
import { appliedAllEvents, cancelApplication, checkAppliedVol, createEvent, deleteEvent, finishedAllEvents, getEvents, getSingleEvent, volenteerApplied } from "../controllers/events.controller.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);
router.route("/getAllEvent").get(verifyJWTV,getEvents);
router.route("/checkVolApplied/:eventId").get(verifyJWTV,checkAppliedVol);
router.route("/AppliedAllEvent/:userId").get(verifyJWTV,appliedAllEvents);
router.route("/FinishedAllEvent/:userId").get(verifyJWTV,finishedAllEvents);
router.route("/getVolenteers").get(getAllVolenteer);
router.route("/getSingleEvent/:eventId").get(verifyJWTV,getSingleEvent);
router.route("/:userId").get(verifyJWTV,getVolenteer);
router.route("/profileImage").put(verifyJWTV,upload.single("profileImage"),updateProfileImage);
router.route("/updateDetail/:userId").put(verifyJWTV,updateDetails);
router.route("/applyInEvent/:eventId").put(verifyJWTV,volenteerApplied);
router.route("/cancelApplication/:eventId").put(verifyJWTV,cancelApplication);
router.route("/deleteVol/:userId").delete(verifyJWTV,deleteVol);
router.route("/deleteEvent/:eventId").delete(verifyJWTV,deleteEvent);
router.route("/createEvent").post(verifyJWTV,upload.single("image"),createEvent);


export default router;