import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../shared/dynamic-table/dynamic-table.component";
import { DynamicFormComponent } from "../../shared/dynamic-form/dynamic-form.component";
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { IdataTransferForm } from '../../core/models/idata-transfer-form';
import { Mode } from '../../core/enums/mode';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DynamicTableComponent, DynamicFormComponent, TooltipModule, ButtonModule],
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
 
}