import { IName } from './interfaces/name';
import { IAddress } from './interfaces/address';
import { IPhone } from './interfaces/phone';
import { IContact } from './interfaces/contact';

export class ContactListEntryResponse {
  contactId: string;
  name: IName;
  address: IAddress;
  phone: IPhone[];
  email: string;

  constructor(contact: IContact) {
    this.contactId = contact.contactId;
    this.name = contact.name;
    this.address = contact.address;
    this.phone = contact.phone;
    this.email = contact.email;
  }
}
