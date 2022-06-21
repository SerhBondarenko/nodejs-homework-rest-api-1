const service = require("../service/contactsService");

const getContactsController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 5, favorite } = req.query;
    const contacts = await service.getContacts({ _id, page, limit, favorite });
    res.json({ message: "Success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getByIdContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const createContactsController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email, phone } = req.body;
    const contact = await service.addContact({ name, email, phone, _id });
    res.status(201).json({ message: "Created", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const deleteContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Delete", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const updateContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await service.updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.json({ message: "Updated", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const updateFavoriteContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await service.updateContact(contactId, { favorite });
    res.json({ message: "Updated", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getByIdContactsController,
  createContactsController,
  updateContactsController,
  updateFavoriteContactsController,
  deleteContactsController,
};
