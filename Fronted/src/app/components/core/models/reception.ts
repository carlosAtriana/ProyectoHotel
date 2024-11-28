import { ICustomer } from "./customer";
import { IRoom } from "./room";




export interface IReception {
  id: string;
  room: IRoom;
  customer: ICustomer;
  checkInDate: Date;
  checkOutDate: Date;
  montoTotal: number;
}
