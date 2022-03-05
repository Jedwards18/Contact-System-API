import { IName } from './interfaces/name';
import { IContact } from './interfaces/contact';
import { IPhone } from './interfaces/phone';

export class CallListContact {
  name: IName;
  phone: string;

  constructor(contact: IContact) {
    this.name = contact.name;
    this.phone = this.getHomePhoneNumber(contact.phone);
  }

  getHomePhoneNumber(phones: IPhone[]): string {
    let homePhoneNumber: string;
    phones.forEach(phone => {
      if (phone.type === 'Home') {
        homePhoneNumber = phone.number;
      }
    });
    return homePhoneNumber;
  }
}
