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

  title:any[] = ['nombre', 'apellido', 'sexo']

  body: any = [
      {nombre: 'Carlos', apellido: 'Triana', sexo: 'masculino'},
      {nombre: 'Juana', apellido: 'Martinez', sexo: 'femenino'},
      {nombre: 'SOfia', apellido: 'Gonzales', sexo: 'femenino'},
      {nombre: 'Jancho ', apellido: 'Piñeres', sexo: 'Masculino'},
  ]
 
}