const contactsOperations = require('./contacts')

const argv = require('yargs').argv

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts()
      console.table(contacts)
      break

    case 'get':
      const contact = await contactsOperations.getContactById(String(id))
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`)
      }
      console.log(contact)
      break

    case 'add':
      const newContact = await contactsOperations.addContact(name, email, phone)
      console.log(newContact)
      break

    case 'remove':
      const removeContact = await contactsOperations.removeContact(String(id))
      console.log(removeContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
