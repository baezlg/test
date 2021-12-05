import express from "express";
import protect from "../middlewares/protect.js";
const router = express.Router();
import authController from "./../controllers/authController.js";
import contactController from "./../controllers/contactController.js";

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/", authController.getUser);
router.get("/:id", protect, authController.getUser);
router
  .route("/:userID/contacts")
  .get(protect, contactController.getAllContacts)
  .post(protect, contactController.CreeateContact);
router
  .route("/:userID/contacts/:contactID")
  .get(protect, contactController.getContact)
  .patch(protect, contactController.updateContact)
  .delete(protect, contactController.deleteContact);

export default router;
