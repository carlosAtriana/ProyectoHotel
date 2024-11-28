import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IRoom } from '../models/room';
import { IReception } from '../models/reception';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor() { }

  apiURL = environment.apiURL;
  http = inject(HttpClient);

  getAllReservations(): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(this.apiURL + '/reservations')
  }

  createReservation(reservation: IReservation): Observable<IReservation> {
    return this.http.post<IReservation>(this.apiURL + '/reservations', reservation)
  }

  updateReservation(reservation: IReservation): Observable<IReservation> {
    return this.http.put<IReservation>(this.apiURL + '/reservations/' + reservation.id, reservation)
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(this.apiURL + '/reservations/' + id)
  }

  getAllRooms(): Observable<any> {
    // return this.http.get(this.apiURL + '/reservations/allowed-rooms/' + reservation.checkInDate + '/' + reservation.checkOutDate)
    return this.http.get(this.apiURL + '/rooms')
  }

  getAllReception(): Observable<IReception[]> {
    return this.http.get<IReception[]>(this.apiURL + '/reception')
  }

  createReception(reception: IReception): Observable<IReception> {
    return this.http.post<IReception>(this.apiURL + '/reception', reception)
  }

  retirarReception(reception: IReception | undefined): Observable<IReception> {
    return this.http.put<IReception>(this.apiURL + '/reception/' + reception?.id, reception)
  }



}
