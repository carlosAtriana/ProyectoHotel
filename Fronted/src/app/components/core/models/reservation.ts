export interface IReservation {
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    numberGuests: number;
    roomType: string;
    description: string;
}