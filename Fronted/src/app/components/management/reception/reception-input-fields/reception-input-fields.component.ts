import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RoomListComponent } from '../../../administration/room/room-list/room-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RoomInputFieldsComponent } from '../../../administration/room/room-input-fields/room-input-fields.component';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { IdataTransferForm } from '../../../core/models/data-transfer-form';
import { IRoom } from '../../../core/models/room';
import { Mode } from '../../../core/enums/mode';

@Component({
  selector: 'app-reception-input-fields',
  standalone: true,
  imports: [AccordionModule, FormsModule, CommonModule, InputTextModule, CalendarModule, CheckboxModule,
    ButtonModule, DropdownModule],
  templateUrl: './reception-input-fields.component.html',
  styleUrl: './reception-input-fields.component.css'
})
export class ReceptionInputFieldsComponent {
  
  @ViewChild('form') form!: NgForm;
  @Input() dataTransferForm: IdataTransferForm<IRoom> = {} as IdataTransferForm<IRoom>;
  @Output() update: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() add: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();
  private _initData: IRoom = {} as IRoom;
  toggleInputs: boolean = true;
  inputHeader: string = "";
  buttonLabel: string = ""

  onCancelar() {
    this.cancelar.emit();
  }

  onAceptar() {
    if (this.form.valid) {
      if (this.dataTransferForm) {
        this.update.emit(this.dataTransferForm.data);
      } else {
        this.add.emit(this.dataTransferForm);
      }
    }
  }


}
