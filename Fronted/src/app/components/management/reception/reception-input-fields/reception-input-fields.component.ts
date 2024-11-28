import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { IRoom } from '../../../core/models/room';
import { TableModule } from 'primeng/table';
import { AdministrationService } from '../../../core/services/administration.service';
import { environment } from '../../../../../environments/environment';
import { ICustomer } from '../../../core/models/customer';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reception-input-fields',
  standalone: true,
  imports: [AccordionModule, FormsModule, CommonModule, InputTextModule, CalendarModule, CheckboxModule,
    ButtonModule, DropdownModule, TableModule],
  templateUrl: './reception-input-fields.component.html',
  styleUrl: './reception-input-fields.component.css'
})
export class ReceptionInputFieldsComponent {
  @ViewChild('form') form!: NgForm;
  @Input() room: IRoom = {} as IRoom;
  @Output() update: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() add: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();
  private _initData: IRoom = {} as IRoom;
  toggleInputs: boolean = true;
  inputHeader: string = "";
  buttonLabel: string = ""
  listCustomers: ICustomer[] = [];
  selectedCustomer: ICustomer = {} as ICustomer;
  customer: ICustomer = {} as ICustomer;


  administrationService = inject(AdministrationService);
  alertService = inject(AlertService);

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.administrationService.getAllCustomer().subscribe({
      next: (data) => {
        this.listCustomers = data;
      },
      error: (error) => {
        this.alertService.error(environment.title, `error al obtener clientes: ${error.error.message}`);
      },
      complete: () => { }
    });
  }

  onCustomerChange(customer: any){
    this.customer = customer.value;
  }


  onCancelar() {
    this.cancelar.emit();
  }
  
  onAceptar() {
  
  }


}
