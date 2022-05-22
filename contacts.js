const fs = require("fs").promises;
const { Module } = require("module");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find((item) => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const idx = allContacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const remove = allContacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    console.log(remove);
    return remove;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

