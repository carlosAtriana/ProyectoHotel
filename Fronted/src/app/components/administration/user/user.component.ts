import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../shared/dynamic-table/dynamic-table.component";
import { DynamicFormComponent } from "../../shared/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  title:any[] = ['Nombre', 'Apellido', 'Sexo']

  body: any = [
      {Nombre: 'Carlos', Apellido: 'Triana', Sexo: 'masculino'},
      {Nombre: 'Juana', Apellido: 'Martinez', Sexo: 'femenino'},
      {Nombre: 'SOfia', Apellido: 'Gonzales', Sexo: 'femenino'},
      {Nombre: 'Jancho ', Apellido: 'Piñeres', Sexo: 'Masculino'},
  ]
 
}