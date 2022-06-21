const express = require("express");
const { authMiddelware } = require("../../middleware/authMiddleware");
const validation = require("../../middleware/validationMiddleware");
const { schema, favoriteSchema } = require("../../service/schemas/contactModel");
const {
  getContactsController,
  getByIdContactsController,
  createContactsController,
  updateContactsController,
  updateFavoriteContactsController,
  deleteContactsController,
} = require("../../controller/contactsController");

const router = express.Router();

router.get("/", authMiddelware, getContactsController);

router.get("/:contactId", authMiddelware, getByIdContactsController);

router.post("/", authMiddelware, validation(schema), createContactsController);

router.put("/:contactId", authMiddelware, validation(schema), updateContactsController);

router.patch(
  "/:contactId/favorite",
  authMiddelware,
  validation(favoriteSchema),
  updateFavoriteContactsController
);

router.delete("/:contactId", authMiddelware, deleteContactsController);

module.exports = router;
