import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Mode } from '../../../core/enums/mode';
import { AlertService } from '../../../core/services/alert.service';
import { IdataTransferForm } from '../../../core/models/idata-transfer-form';
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-room-input-fields',
  standalone: true,
  imports: [AccordionModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './room-input-fields.component.html',
  styleUrl: './room-input-fields.component.css'
})
export class RoomInputFieldsComponent {

  @ViewChild('form') form!: NgForm;
  @Input() dataTransferForm: IdataTransferForm<any> = {} as IdataTransferForm<any>;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();
  private _initData: any = {} as any;
  toggleInputs: boolean = true;
  inputHeader: string = "Nuevo";
  buttonLabel : string = ""

  campos: any[] = [
    {label: "Nombre", name: "nombre", type: "text", required: true, placeholder: "Ingrese el nombre", model:"nombre"}, 
    {label: "Descripción", name: "descripcion", type: "number", required: true, placeholder: "Ingrese la descripción", model: "descripcion"}, 
    {label: "Fecha de Instalación", name: "fechaInstalacion", type: "date", required: true, placeholder: "Seleccione la fecha de instalación", model: "fecha"},
  ];

  alertService = inject(AlertService);

  ngOnChanges(changes: SimpleChanges): void {
    const dataTransferForm = changes['dataTransferForm'].currentValue;
    const { mode, data } = dataTransferForm;
    switch (mode) {
      case Mode.edit:       
        this.inputHeader = "Editar"
        this.buttonLabel = "Editar"
        this.toggleInputs = true;
        // data.fechaInstalacion = (typeof data.fechaInstalacion === "string") ? moment(data.fechaInstalacion).toDate() : data.fechaInstalacion;
        this._initData = Object.assign({}, data);
        break;
      case Mode.new:   
        this.toggleInputs = true;
        this.inputHeader = "Nuevo";
        this.buttonLabel = "Aceptar"
        break;
    }

  }

  onAceptar(): void {
    const value = this.dataTransferForm.data;

    switch (this.dataTransferForm.mode) {
      case Mode.edit:
        if (JSON.stringify(this._initData) === JSON.stringify(value)) {
          this.onCancelar();
        } else {          
          this.alertService.question('hola',
            `¿Está seguro en editar el activo?.`,
            'Si','No').then((result:any) => {
              if (result.isConfirmed){
                this.update.emit(value);
              }
            });

        }
        break;

      case Mode.new:
        this.add.emit(value);

        break;
      case Mode.none:
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



