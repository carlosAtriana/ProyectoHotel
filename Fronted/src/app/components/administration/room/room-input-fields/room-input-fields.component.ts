import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Mode } from '../../../core/enums/mode';
import { AlertService } from '../../../core/services/alert.service';
import { IdataTransferForm } from '../../../core/models/data-transfer-form';
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { IRoom } from '../../../core/models/room';
import { environment } from '../../../../../environments/environment';

interface IOptions{
  name: string;
}
interface IOptionsFloor{
  number: number;
}

@Component({
  selector: 'app-room-input-fields',
  standalone: true,
  imports: [AccordionModule, FormsModule, CommonModule, InputTextModule, CalendarModule, CheckboxModule,
    ButtonModule, DropdownModule],
  templateUrl: './room-input-fields.component.html',
  styleUrl: './room-input-fields.component.css'
})
export class RoomInputFieldsComponent {

  @ViewChild('form') form!: NgForm;
  @Input() dataTransferForm: IdataTransferForm<IRoom> = {} as IdataTransferForm<IRoom>;
  @Output() update: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() add: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();
  private _initData: IRoom = {} as IRoom;
  toggleInputs: boolean = true;
  inputHeader: string = "";
  buttonLabel: string = ""
  listFloor: IOptionsFloor[] = [{number: 1},{number: 2},{number: 3}];
  floorSelected: IOptionsFloor = {} as IOptionsFloor;
  listTypeRoom: IOptions[] = [{name: "Sencilla"},{name: "Doble"},{name: "Matrimonial"},{name: "Familiar"},{name: "Suite"},];
  typeRoomSelected: IOptions = {} as IOptions;
  liststatus: IOptions[] = [{name: "Disponible"},{name: "Ocupado"},{name: "Reservado"},{name: "Mantenimiento"},];
  statusSelected: IOptions = {} as IOptions;


  alertService = inject(AlertService);

  ngOnChanges(changes: SimpleChanges): void {
    const dataTransferForm = changes['dataTransferForm'].currentValue;
    const { mode, data } = dataTransferForm;
    switch (mode) {
      case Mode.edit:
        this.floorSelected.number = dataTransferForm.data.floor;
        this.typeRoomSelected.name = dataTransferForm.data.type;
        this.statusSelected.name = dataTransferForm.data.status;
        this.inputHeader = "Editar"
        this.buttonLabel = "Editar"
        this.toggleInputs = true;
        this._initData = { ...data };
        break;
      case Mode.new:
        this.floorSelected = this.listFloor[0];
        this.typeRoomSelected = this.listTypeRoom[0];
        this.statusSelected = this.liststatus[0];
        this.toggleInputs = true;
        this.inputHeader = "Nuevo";
        this.buttonLabel = "Aceptar"
        break;
    }
  }
  onAceptar(): void {
    const {data: currentData, mode} = this.dataTransferForm;
    switch (mode) {
      case Mode.edit:
        currentData.floor = this.floorSelected.number;
        currentData.type = this.typeRoomSelected.name;
        currentData.status = this.statusSelected.name;
        if (JSON.stringify(this._initData) === JSON.stringify(currentData)) {
          this.onCancelar();
        } else {
          this.alertService.question(environment.title,
            `¿Está seguro en editar esta habitación?.`,
            'Si', 'No').then((result: any) => {
              if (result.isConfirmed) {
                this.update.emit(currentData);
              }
            });
        }
        break;
      case Mode.new:
        currentData.floor = this.floorSelected.number;
        currentData.type = this.typeRoomSelected.name;
        currentData.status = this.statusSelected.name;
        this.add.emit(currentData);
        break;

    }
  }
  onCancelar(): void {
    this.cancelar.emit();
  }

}



