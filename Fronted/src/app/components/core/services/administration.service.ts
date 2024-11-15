import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/customer';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  apiUrl = environment.apiURL;

  http = inject(HttpClient)

  getAllCuestomer(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl + '/clientes');
  }
  createCustomer(customer: ICustomer): Observable<any> {
    return this.http.post(this.apiUrl + '/clientes', customer);
  }
  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(this.apiUrl + '/clientes/' + customer.id, customer);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/clientes/' + id);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl + '/usuarios');
  }
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl + '/usuarios', user);
  }
  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.apiUrl + '/usuarios/' + user.id, user);
  }
  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(this.apiUrl + '/usuarios/' + id);
  }
}
