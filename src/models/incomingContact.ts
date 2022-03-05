import { states } from './stateNames';
import { capitalizeFirstLetter } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { IName } from './interfaces/name';
import { IAddress } from './interfaces/address';
import { IPhone } from './interfaces/phone';
import { IContact } from './interfaces/contact';

export class IncomingContact {
  contactId?: string;
  name: IName;
  address: IAddress;
  phone: IPhone[];
  email: string;

  constructor(contact: IContact, id?: string) {
    this.contactId = id ? id : uuidv4();
    this.name = this.formatName(contact?.name) ?? null;
    this.address = this.formatAddress(contact?.address) ?? null;
    this.phone = this.formatPhones(contact?.phone) ?? null;
    this.email = contact?.email === '' ? null : contact?.email ?? null;
  }

  private formatPhones(phones: IPhone[]) {
    const formattedPhones: IPhone[] = [];
    if (phones.length < 1) {
      return null;
    }

    phones.forEach(phone => {
      //Removes any non-digits from the input string and then reformats the phonenumber
      const cleaned = ('' + phone.number).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        phone.number = `${match[1]}-${match[2]}-${match[3]}`;
      }
      phone.type = capitalizeFirstLetter(phone.type) ?? null;

      if (Object.values(phone).some(x => x === null)) return null;

      formattedPhones.push(phone);
    });

    return formattedPhones;
  }

  private formatName(name: IName) {
    if (name) {
      const formattedName = {} as IName;

      formattedName.first = capitalizeFirstLetter(name?.first) ?? null;
      formattedName.middle = capitalizeFirstLetter(name?.middle) ?? null;
      formattedName.last = capitalizeFirstLetter(name?.last) ?? null;

      if (Object.values(formattedName).some(x => x === null)) return null;

      return formattedName;
    } else {
      return null;
    }
  }

  private formatAddress(address: IAddress) {
    if (address) {
      const formattedAddress = {} as IAddress;

      formattedAddress.street = capitalizeFirstLetter(address?.street) ?? null;
      formattedAddress.city = capitalizeFirstLetter(address?.city) ?? null;
      formattedAddress.state = address?.state.length === 2 ? states[address?.state] : capitalizeFirstLetter(address?.state) ?? null;
      formattedAddress.zip = address?.zip?.split('-')[0] ?? null;

      if (Object.values(formattedAddress).some(x => x === null)) return null;

      return formattedAddress;
    }
  }
}
