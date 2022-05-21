const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  } = require("./contacts");
  const yargs = require("yargs");
  const { hideBin } = require("yargs/helpers");
  
  const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.log(allContacts);
        break;
  
      case "get":
        const getById = await getContactById(id);
        console.log(getById);
        break;
  
      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        break;
  
      case "remove":
        const remove = await removeContact(id);
        console.log(remove);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  };
  
  const arr = hideBin(process.argv);
  const { argv } = yargs(arr);
  invokeAction(argv);