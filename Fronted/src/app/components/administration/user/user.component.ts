import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../shared/dynamic-table/dynamic-table.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  title:any[] = ['name', 'apellido', 'sexo']

  body: any = [
      {name: 'hola', apellido: 'dsd', sexo: 'masculino'}
  ]
 
}