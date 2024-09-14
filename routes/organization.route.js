import { Router } from "express";
import { deleteCom, getAllCompany, getCompany, loginCompany, logOutCompany, registerCompany,updateDetails,updateProfileImageC } from "../controllers/organizations.controller.js";
import verifyJWTC from "../middleware/verifyJwtCompany.js";
import { upload } from "../middleware/upload.middleware.js";
import { companyCurrentEvents, companyFinishedEvents, createEvent, getSingleEvent, rejectVol, updateEvent, updateImage } from "../controllers/events.controller.js";
const router = Router();


router.route("/register").post(registerCompany);
router.route("/login").post(loginCompany);
router.route("/logout").post(logOutCompany);
router.route("/getCompanys").get(getAllCompany);
router.route("/getSingleEvent/:eventId").get(verifyJWTC,getSingleEvent);
router.route("/companyCurrentEvents/:companyId").get(verifyJWTC,companyCurrentEvents);
router.route("/companyFinishedEvents/:companyId").get(verifyJWTC,companyFinishedEvents);
router.route("/profileImage").put(verifyJWTC,upload.single("profileImage"),updateProfileImageC);
router.route("/:companyId").get(getCompany);
router.route("/updateDetail/:companyId").put(verifyJWTC,updateDetails);
router.route("/updateEvent/:eventId").put(verifyJWTC,updateEvent);
router.route("/updateImage/:eventId").put(verifyJWTC,upload.single("imageFile"),updateImage);
router.route("/rejectVolenteer/:eventId").put(verifyJWTC,rejectVol);
router.route("/updateDetailByAdmin/:userId").put(updateDetails);
router.route("/deleteCom/:userId").delete(verifyJWTC,deleteCom);
router.route("/deleteComByAdmin/:userId").delete(deleteCom);
router.route("/createEvent").post(verifyJWTC,upload.single("imageFile"),createEvent);

export default router