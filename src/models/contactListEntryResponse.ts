import { IName, IAddress, IPhone, IContact } from './interfaces';

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
