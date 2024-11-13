import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../shared/dynamic-table/dynamic-table.component";
import { CustomerInputFieldsComponent } from "./customer-input-fields/customer-input-fields.component";
import { Mode } from '../../core/enums/mode';
import { IdataTransferForm } from '../../core/models/idata-transfer-form';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [DynamicTableComponent, CustomerInputFieldsComponent, ButtonModule, TooltipModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  title: any[] = [
    'ID',
    'Nombre',
    'Apellido',
    'Email',
    'Teléfono',
    'Dirección',
    'Fecha de nacimiento',
    'Edad',
    'Sexo',
    'Estado',
  ];

  data: any[] = [
    {
      ID: 1,
      Nombre: 'Juan',
      Apellido: 'Perez',
      Email: 'juan.perez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 123 #45-67',
      'Fecha de nacimiento': '1990-01-01',
      Edad: 25,
      Sexo: 'Masculino',
      Estado: 'Activo',
    },
    {
      ID: 2,
      Nombre: 'Pedro',
      Apellido: 'Garcia',
      Email: 'pedro.garcia@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 456 #78-90',
      'Fecha de nacimiento': '1985-06-15',
      Edad: 30,
      Sexo: 'Masculino',
      Estado: 'Inactivo',
    },
    {
      ID: 3,
      Nombre: 'Ana',
      Apellido: 'Lopez',
      Email: 'ana.lopez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 789 #12-34',
      'Fecha de nacimiento': '1995-07-30',
      Edad: 20,
      Sexo: 'Femenino',
      Estado: 'Activo',
    },
    {
      ID: 4,
      Nombre: 'Maria',
      Apellido: 'Gonzalez',
      Email:'maria.gonzalez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 111 #22-33',
      'Fecha de nacimiento': '1980-02-20',
      Edad: 35,
      Sexo: 'Femenino',
      Estado: 'Inactivo',
    },
    {
      ID: 5,
      Nombre: 'Jorge',
      Apellido: 'Martinez',
      Email: 'jorge.martinez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 555 #66-77',
      'Fecha de nacimiento': '1987-08-10',
      Edad: 28,
      Sexo: 'Masculino',
      Estado: 'Activo',
    },
    {
      ID: 6,
      Nombre: 'Sara',
      Apellido: 'Gutierrez',
      Email:'sara.gutierrez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 888 #99-11',
      'Fecha de nacimiento': '1992-12-31',
      Edad: 23,
      Sexo: 'Femenino',
      Estado: 'Inactivo',
    },
    {
      ID: 7,
      Nombre: 'David',
      Apellido: 'Rodriguez',
      Email: 'david.rodriguez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 222 #33-44',
      'Fecha de nacimiento': '1983-04-15',
      Edad: 32,
      Sexo: 'Masculino',
      Estado: 'Activo',
    },
    {
      ID: 8,
      Nombre: 'Luis',
      Apellido: 'Sanchez',
      Email: 'luis.sanchez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 666 #77-88',
      'Fecha de nacimiento': '1997-05-05',
      Edad: 19,
      Sexo: 'Masculino',
      Estado: 'Inactivo',
    },
    {
      ID: 9,
      Nombre: 'Miguel',
      Apellido: 'Gomez',
      Email:'miguel.gomez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 999 #11-22',
      'Fecha de nacimiento': '1989-06-06',
      Edad: 27,
      Sexo: 'Masculino',
      Estado: 'Activo',
    },
    {
      ID: 10,
      Nombre: 'Isabella',
      Apellido: 'Ramirez',
      Email: 'isabella.ramirez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 333 #44-55',
      'Fecha de nacimiento': '1994-07-07',
      Edad: 22,
      Sexo: 'Femenino',
      Estado: 'Inactivo',
    },
    {
      ID: 11,
      Nombre: 'Daniela',
      Apellido: 'Garcia',
      Email: 'daniela.garcia@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 777 #88-99',
      'Fecha de nacimiento': '1981-08-08',
      Edad: 34,
      Sexo: 'Femenino',
      Estado: 'Activo',
    },
    {
      ID: 12,
      Nombre: 'Carlos',
      Apellido: 'Lopez',
      Email: 'carlos.lopez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 111 #22-33',
      'Fecha de nacimiento': '1986-09-09',
      Edad: 29,
      Sexo: 'Masculino',
      Estado: 'Inactivo',
    },
    {
      ID: 13,
      Nombre: 'Marcos',
      Apellido: 'Martinez',
      Email:'marcos.martinez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 555 #66-77',
      'Fecha de nacimiento': '1988-10-10',
      Edad: 26,
      Sexo: 'Masculino',
      Estado: 'Activo',
    },
    {
      ID: 14,
      Nombre: 'Sofia',
      Apellido: 'Gutierrez',
      Email:'sofia.gutierrez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 888 #99-11',
      'Fecha de nacimiento': '1993-11-11',
      Edad: 24,
      Sexo: 'Femenino',
      Estado: 'Inactivo',
    },
    {
      ID: 15,
      Nombre: 'Emily',
      Apellido: 'Rodriguez',
      Email: 'emily.rodriguez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 222 #33-44',
      'Fecha de nacimiento': '1984-12-12',
      Edad: 31,
      Sexo: 'Femenino',
      Estado: 'Activo',
    },
    {
      ID: 16,
      Nombre: 'Lucas',
      Apellido: 'Sanchez',
      Email: 'lucas.sanchez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 666 #77-88',
      'Fecha de nacimiento': '1998-01-01',
      Edad: 21,
      Sexo: 'Masculino',
      Estado: 'Inactivo',
    },
    {
      ID: 17,
      Nombre: 'Mateo',
      Apellido: 'Gomez',
      Email:'mateo.gomez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 999 #11-22',
      'Fecha de nacimiento': '1990-02-02',
      Edad: 28,
      Sexo: 'Masculino',
      Estado: 'Activo',
    },
    {
      ID: 18,
      Nombre: 'Samantha',
      Apellido: 'Ramirez',
      Email:'samantha.ramirez@gmail.com',
      Teléfono: '5555555555',
      Dirección: 'Calle 333 #44-55',
      'Fecha de nacimiento': '1995-03-03',
      Edad: 23,
      Sexo: 'Femenino',
      Estado: 'Inactivo',
    },
  ];

  
  dataTransferForm: IdataTransferForm<any> = {
    data: {} as any,
    mode: Mode.none
  }
  mode: typeof Mode= Mode;

  onNew(){
    this.dataTransferForm.mode = Mode.new;
  }

  onCancel(){
    delete this.dataTransferForm.data;
    this.dataTransferForm.mode = Mode.none;
  }
 

}




