import { Router, Request, Response } from 'express';
import { logEvent, Events, LogLevels } from '../services/logging';
import { db } from '../db';
import { IncomingContact } from '../models/incomingContact';
import { ContactListEntryResponse } from '../models/contactListEntryResponse';
import { CallListContact } from '@/models/callListContact';
import { IContact } from '../models/interfaces/contact';

const applicationRouter: Router = Router();

applicationRouter.get('/', async (req: Request, res: Response) => {
  res.send('Connected...');
});

applicationRouter.get('/contacts', async (req: Request, res: Response) => {
  logEvent(LogLevels.Info, Events.GetContacts, 'Getting existing contacts');
  try {
    const contactsCollection = await db.getCollection('contacts');

    const existingContacts: ContactListEntryResponse[] = [];
    contactsCollection.data.map((contact: IContact) => {
      const outgoingContact = new ContactListEntryResponse(contact);
      existingContacts.push(outgoingContact);
    });

    if (existingContacts.length < 0) {
      logEvent(LogLevels.Info, Events.GetContacts, 'No existing contacts');
      res.status(200).send('No existing contacts');
    } else {
      res.status(200).json(existingContacts);
    }
  } catch (error) {
    logEvent(LogLevels.Error, Events.GetContacts, 'An error occurred while retrieving contacts', { error: error });
    res.status(500).send('An error occurred while retrieving contacts');
  }
});

applicationRouter.post('/contacts', async (req: Request, res: Response) => {
  logEvent(LogLevels.Info, Events.CreateNewContact, 'Creating new contact');

  try {
    const contactsCollection = db.getCollection('contacts');
    const contactToCreate = new IncomingContact(req.body);
    if (Object.values(contactToCreate).some(x => x === null)) {
      res.status(400).send('The contact information provided does not adhere to the required format.');
      return;
    }

    const contact = await contactsCollection.findOne({
      'name.first': contactToCreate.name.first,
      'name.middle': contactToCreate.name.middle,
      'name.last': contactToCreate.name.last,
    });
    if (contact) {
      res.status(409).send('A contact already exists for this person.');
      return;
    }

    await contactsCollection.insert(contactToCreate);
    res.status(201).send('Contact successfully created');
  } catch (error) {
    logEvent(LogLevels.Error, Events.CreateNewContact, 'Error creating contact', { error: error });
    res.status(500).send('An error occurred creating a new contact');
  }
});

applicationRouter.put('/contacts/id/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  logEvent(LogLevels.Info, Events.UpdateContact, `Updating specified contact: ${id}`);

  try {
    const contactsCollection = await db.getCollection('contacts');

    let contactToUpdate: IContact = await contactsCollection.findOne({ contactId: id });
    if (!contactToUpdate) {
      res.status(404).send(`No existing contact matches the specified id: ${id}`);
      return;
    }

    const updatedContact = new IncomingContact(req.body, contactToUpdate.contactId);
    updatedContact['meta'] = contactToUpdate['meta'];
    updatedContact['$loki'] = contactToUpdate['$loki'];
    if (Object.values(updatedContact).some(x => x === null)) {
      res.status(400).send('The contact information provided does not adhere to the required format.');
      return;
    }

    contactToUpdate = updatedContact;

    await contactsCollection.update(contactToUpdate);
    res.status(201).send('Contact successfully updated');
  } catch (error) {
    logEvent(LogLevels.Info, Events.UpdateContact, `Error updating contact: ${id}`, { error: error });
    res.status(500).send(`An error occurred while updating the specified contact: ${id}`);
  }
});

applicationRouter.get('/contacts/id/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  logEvent(LogLevels.Info, Events.GetSpecificContact, `Getting specified contact: ${id}`);

  try {
    const contactsCollection = await db.getCollection('contacts');

    const contact: IContact = await contactsCollection.findOne({ contactId: id });
    if (!contact) {
      logEvent(LogLevels.Error, Events.GetSpecificContact, `No existing contact matches the specified id: ${id}`);
      res.status(404).send(`No existing contact matches the specified id: ${id}`);
      return;
    }
    const outgoingContact = new ContactListEntryResponse(contact);
    res.status(200).json(outgoingContact);
  } catch (error) {
    logEvent(LogLevels.Error, Events.GetSpecificContact, `An error occurred while retrieving the specified contact: ${id}`, { error: error });
    res.status(500).send(`An error occurred while retrieving the specified contact: ${id}`);
  }
});

applicationRouter.delete('/contacts/id/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  logEvent(LogLevels.Info, Events.DeleteContact, `Deleting contact: ${id} `);

  try {
    const contactsCollection = await db.getCollection('contacts');
    const response = contactsCollection.findOne({ contactId: id });

    if (!response) {
      logEvent(LogLevels.Error, Events.DeleteContact, `No matching contact: ${id}`);
      res.status(404).send(`No existing contact matches the specified id: ${id}`);
      return;
    }

    contactsCollection.remove(response);
    res.status(200).send(`Resource deleted successfully`);
  } catch (error) {
    logEvent(LogLevels.Error, Events.DeleteContact, `Error deleting contact: ${id}`, { error: error });
    res.status(500).send(`An error occurred while deleting the specified contact: ${id}`);
  }
});

applicationRouter.get('/contacts/call-list', async (req: Request, res: Response) => {
  logEvent(LogLevels.Info, Events.GetCallList, 'Retrieving call list');

  try {
    const contactsCollection = await db.getCollection('contacts');

    const callListResponse: CallListContact[] = [];
    const callListItem = contactsCollection.find({ 'phone.type': 'Home' });
    callListItem.map(item => {
      callListResponse.push(new CallListContact(item));
    });
    callListResponse.sort((a, b) => a.name.last.localeCompare(b.name.last) || a.name.first.localeCompare(b.name.first));
    res.status(200).json(callListResponse);
  } catch (error) {
    logEvent(LogLevels.Error, Events.GetCallList, 'Error retrieving call list', { error: error });
    res.status(500).send(`An error occurred while retrieving the call list`);
  }
});

export default applicationRouter;
