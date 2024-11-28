import { IReservation } from "./reservation";

export interface EventoRutina {
  title: string;
  start: Date;
  backgroundColor: string;
  extendedProps: IReservation;
}

