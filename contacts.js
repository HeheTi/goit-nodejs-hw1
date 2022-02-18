const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");
// const absolutePath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const filtrCont = JSON.parse(data).filter(({ id }) => {
        return id === String(contactId);
      });
      console.table(filtrCont);
    })
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const filtrCont = JSON.parse(data).filter(({ id }) => {
        return id !== String(contactId);
      });
      fs.writeFile(contactsPath, JSON.stringify(filtrCont));
    })
    .then(() => listContacts())
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      const newContact = { id: nanoid(), name, email, phone };
      const updateContacts = [...data, newContact];
      fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    })
    .then(() => listContacts())
    .catch((err) => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
