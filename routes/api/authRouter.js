const express = require("express");
const { authMiddelware } = require("../../middleware/authMiddleware");
const { upload } = require("../../middleware/multerMiddleware");
const validationMiddleware = require("../../middleware/validationMiddleware");
const { schema, subscriptionSchema } = require("../../service/schemas/userModel");
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
} = require("../../controller/authController");

const router = express.Router();

router.post("/registration", validationMiddleware(schema), registrationController);

router.post("/login", validationMiddleware(schema), loginController);

router.get("/logout", authMiddelware, logoutController);

router.get("/current", authMiddelware, getCurrentUser);

router.patch("/", authMiddelware, validationMiddleware(subscriptionSchema), updateSubscription);

router.patch(
  "/avatars",
  authMiddelware,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
