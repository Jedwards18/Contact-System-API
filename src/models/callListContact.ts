import { IName, IPhone, IContact } from './interfaces';

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
