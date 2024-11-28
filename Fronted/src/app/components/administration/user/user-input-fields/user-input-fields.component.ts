import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { Mode } from '../../../core/enums/mode';
import { AlertService } from '../../../core/services/alert.service';
import { IdataTransferForm } from '../../../core/models/data-transfer-form';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { AdministrationService } from '../../../core/services/administration.service';
import { IUser } from '../../../core/models/user';

interface roleDTO {
    name: string;
}

@Component({
  selector: 'app-user-input-fields',
  standalone: true,
  imports: [AccordionModule, FormsModule, CommonModule, InputTextModule, MultiSelectModule, DropdownModule,
    CalendarModule, CheckboxModule, ButtonModule,],
  templateUrl: './user-input-fields.component.html',
  styleUrl: './user-input-fields.component.css'
})
export class UserInputFieldsComponent {
  @ViewChild('form') form!: NgForm;
  @Input() dataTransferForm: IdataTransferForm<IUser> = {} as IdataTransferForm<IUser>;
  @Output() add: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() update: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();
  private _initData: IUser = {} as IUser;
  toggleInputs: boolean = true;
  inputHeader: string = "Nuevo";
  labelButton: string = "Aceptar";
  rolesOptions: roleDTO[] = [{ name: 'Administrador' }, { name: 'Cliente' }, { name: 'Empleado' }];
  rolSelected: roleDTO = {} as roleDTO;

  alertService = inject(AlertService);
  administrationService = inject(AdministrationService);

  ngOnChanges(changes: SimpleChanges): void {
    const dataTransferForm = changes['dataTransferForm']?.currentValue;
    // if (dataTransferForm) {
    const { mode, data } = dataTransferForm;
    switch (mode) {
      case Mode.new:
        this.toggleInputs = true;
        this.inputHeader = 'Nuevo Usuario';
        this.labelButton = 'Aceptar';
        break;
      case Mode.edit:
        console.log("hola", this.dataTransferForm.data.rol)
        this._initData = {...data};
        this.rolSelected.name = data.rol;
        this.inputHeader = 'Editar Usuario';
        this.labelButton = 'Editar';
        this.toggleInputs = true;
        break;
    }
  }

  onAceptar(): void {
    const { data: currentData, mode } = this.dataTransferForm;
    switch (mode) {
      case Mode.new:
        currentData.fullName = currentData.name + currentData.lastName;
        currentData.rol = this.rolSelected.name;
        this.add.emit(currentData);
        break;
      case Mode.edit:
        currentData.fullName = currentData.name + currentData.lastName;
        currentData.rol = this.rolSelected.name;
        if (JSON.stringify(this._initData) === JSON.stringify(currentData)) {
          this.onCancelar();
        } else {
          this.alertService
            .question(
              environment.title,
              '¿Está seguro de editar el usuario?.',
              'Si',
              'No'
            )
            .then((result) => {
              if (result.isConfirmed) {
                this.update.emit(currentData);
              }
            });
        }
        break;
    }
  }

  onCancelar(): void {
    this.cancelar.emit();
  }



  //para opcion de editar un activo----------------------------------
  // assignValuesInEdit() {
  //   let estados: IEstado[] = this.dataTransferForm.options.estados;
  //   let sistemas: ISistema[] = this.dataTransferForm.options.sistemas;
  //   if (this.dataTransferForm?.data?.estado! == true) this.stateSelected = estados.find(x=>x.name == environment.states.activo)!
  //   else this.stateSelected = estados.find(x=>x.name == environment.states.inactivo)!
  //   this.systemSelected = sistemas.find(x=>x.id == this.dataTransferForm.data.sistemaId)
  // }

  //asignacion de valores al cambiar selección en los dropDown--------------------------------------------------------
  // onChangeState() {
  //   if (this.stateSelected.name == environment.states.activo) {
  //     this.dataTransferForm.data.estado = true
  //   }
  //   else this.dataTransferForm.data.estado = false;
  // }

  onChangeSystem() {
    //this.dataTransferForm.data.sistemaId = this.systemSelected.id
  }
}


