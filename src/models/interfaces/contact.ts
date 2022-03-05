import { IName } from "./name";
import { IAddress } from "./address";
import { IPhone } from "./phone";

export interface IContact {
    contactId?: string;
    name: IName;
    address: IAddress;
    phone: IPhone[];
    email: string;
}