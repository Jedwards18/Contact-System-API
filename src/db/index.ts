import loki from 'lokijs';
import { existingContacts } from '../models/exampleContacts';
import { logEvent, Events, LogLevels } from '../services/logging';

const db = new loki('contactsystem.db', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
});

async function databaseInitialize() {
  // db.removeCollection('contacts');
  logEvent(LogLevels.Info, Events.InitializingDatabase, 'Initializing database');

  let contacts = db.getCollection('contacts');

  if (!contacts) {
    contacts = db.addCollection('contacts');
  }

  if (contacts.count() < 1) {
    seedData();
  }

  logEvent(LogLevels.Info, Events.InitializingDatabase, 'Database initialized');
}

function seedData() {
  logEvent(LogLevels.Info, Events.SeedingCollection, 'Seeding collection');

  const contacts = db.getCollection('contacts');

  if (existingContacts && existingContacts.length > 0) {
    contacts.insert(existingContacts);
    logEvent(LogLevels.Info, Events.SeedingCollection, 'Collection seeded');
  } else {
    logEvent(LogLevels.Info, Events.SeedingCollection, 'No data with which to seed the collection');
  }
}

export { db };
