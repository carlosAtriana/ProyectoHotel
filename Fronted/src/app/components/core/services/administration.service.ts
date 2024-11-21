import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/customer';
import { IUser } from '../models/user';
import { IRoom } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  apiUrl = environment.apiURL;

  http = inject(HttpClient)

  getAllCustomer(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl + '/clientes');
  }
  createCustomer(customer: ICustomer): Observable<any> {
    return this.http.post(this.apiUrl + '/clientes', customer);
  }
  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(this.apiUrl + '/clientes/' + customer.id, customer);
  }
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/clientes/' + id);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl + '/usuarios');
  }
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl + '/usuarios', user);
  }
  updateUser(user: IUser): Observable<IUser> {
    console.log("el user desde el servicio es: ", user);
    return this.http.put<IUser>(this.apiUrl + '/usuarios/' + user.id, user);
  }
  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(this.apiUrl + '/usuarios/' + id);
  }

  getAllRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.apiUrl + '/roms');
  }
  createRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>(this.apiUrl + '/roms', room);
  }
  updateRoom(room: IRoom): Observable<IRoom> {
    return this.http.put<IRoom>(this.apiUrl + '/roms/' + room.id, room);
  }
  deleteRoom(id: string): Observable<IRoom> {
    return this.http.delete<IRoom>(this.apiUrl + '/roms/' + id);
  }


}
