import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/reservations/' + id)
  }
}
