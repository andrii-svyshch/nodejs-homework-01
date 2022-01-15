const fs = require('fs/promises')
const updateContacts = require('./updateContacts')
const { v4 } = require('uuid')
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === contactId)
  if (!contact) {
    return null
  }
  return contact
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { name, email, phone, id: v4() }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const removeContact = async contactId => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  const [contact] = contacts.splice(idx, 1)
  await updateContacts(contacts)
  return contact
}

module.exports = { listContacts, getContactById, removeContact, addContact }
