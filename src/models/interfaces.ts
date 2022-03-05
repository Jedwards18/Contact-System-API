export interface IContact {
  contactId?: string;
  name: IName;
  address: IAddress;
  phone: IPhone[];
  email: string;
}

export interface IName {
  first: string;
  middle: string;
  last: string;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IPhone {
  number: string;
  type: string; //either "Home", "Work" or "Mobile"
}
