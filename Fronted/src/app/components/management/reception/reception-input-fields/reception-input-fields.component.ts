import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
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
import { ManagementService } from '../../../core/services/management.service';
import { IReception } from '../../../core/models/reception';

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
  reception: IReception = {} as IReception;

  administrationService = inject(AdministrationService);
  managementService = inject(ManagementService);
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
  
  onAceptar() {
    const dataCurrent = new Date()
    this.reception.room = this.room;
    this.reception.customer = this.customer;
    this.reception.checkInDate = dataCurrent;
    this.managementService.createReception(this.reception).subscribe({
      next: () => {
        this.alertService.success(environment.title, `Recepción creada correctamente`);
      },error: (error) => {
        this.alertService.error(environment.title, `error al crear recepción: ${error.error}`);
      },
      complete: () => {
        this.onCancelar();
       }
    })
  }

  onCustomerChange(customer: any){
    this.customer = customer.value;
  }


  onCancelar() {
    this.cancelar.emit();
  }


}
