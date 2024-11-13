import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../shared/dynamic-table/dynamic-table.component";
import { DynamicFormComponent } from "../../shared/dynamic-form/dynamic-form.component";
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { IdataTransferForm } from '../../core/models/idata-transfer-form';
import { Mode } from '../../core/enums/mode';
import { Validators } from '@angular/forms';
import { UserInputFieldsComponent } from "./user-input-fields/user-input-fields.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DynamicTableComponent, TooltipModule, ButtonModule, UserInputFieldsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  dataTransferForm: IdataTransferForm<any> = {
    data: {} as any,
    mode: Mode.none
  }
  mode: typeof Mode= Mode;

  title:any[] = ['Nombre', 'Apellido', 'Sexo']

  body: any = [
      {Nombre: 'Carlos', Apellido: 'Triana', Sexo: 'masculino'},
      {Nombre: 'Juana', Apellido: 'Martinez', Sexo: 'femenino'},
      {Nombre: 'SOfia', Apellido: 'Gonzales', Sexo: 'femenino'},
      {Nombre: 'Jancho ', Apellido: 'Piñeres', Sexo: 'Masculino'},
  ]

  onNew(){
    this.dataTransferForm.mode = Mode.new;
  }

  onCancel(){
    delete this.dataTransferForm.data;
    this.dataTransferForm.mode = Mode.none;
  }
 
  formFields = [
    { type: 'text', label: 'Nombre', name: 'nombre', validations: [Validators.required] },
    { type: 'email', label: 'Correo Electrónico', name: 'email', validations: [Validators.required, Validators.email] },
    { type: 'number', label: 'Edad', name: 'edad', validations: [Validators.required, Validators.min(18)] }
  ];
}