export interface IReservation {
  id: string;
  sequential: number;
  checkInDate: Date ;
  checkOutDate: Date;
  numberGuests: number;
  roomType: string;
  description: string;
  customerId: string;
}