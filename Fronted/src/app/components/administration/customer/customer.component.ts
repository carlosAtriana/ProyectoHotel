import { Component, inject } from '@angular/core';
import { CustomerInputFieldsComponent } from "./customer-input-fields/customer-input-fields.component";
import { Mode } from '../../core/enums/mode';
import { IdataTransferForm } from '../../core/models/data-transfer-form';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AdministrationService } from '../../core/services/administration.service';
import { AlertService } from '../../core/services/alert.service';
import { environment } from '../../../../environments/environment';
import { ICustomer } from '../../core/models/customer';
import { CustomerListComponent } from "./customer-list/customer-list.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CustomerInputFieldsComponent, ButtonModule, TooltipModule, CustomerListComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  dataTransferForm: IdataTransferForm<ICustomer> = {
    data: {} as ICustomer,
    mode: Mode.none
  }
  mode: typeof Mode = Mode;
  listCustomers: ICustomer[] = [];

  administrationService = inject(AdministrationService)
  alertService = inject(AlertService)

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

  createCustomer(customer: ICustomer) {
    this.administrationService.createCustomer(customer).subscribe({
      next: (data) => {
        this.alertService.success(environment.title, 'Cliente creado correctamente');
      },
      error: (error) => {
        this.alertService.error(environment.title, error.error.message);
      },
      complete: () => {
        this.getCustomers();
        this.noneMode();

      }
    });
  }

  onUpdate(customer: ICustomer) {
    this.dataTransferForm = {
      data: customer,
      mode: Mode.edit
    }
  }
  update(customer: ICustomer) {
    this.administrationService.updateCustomer(customer).subscribe({
      next: (data) => {
        this.alertService.success(environment.title, 'Cliente actualizado correctamente');
      },
      error: (error) => {
        this.alertService.error(environment.title, error.error.message);
      },
      complete: () => {
        this.getCustomers();
        this.noneMode();
      }
    });
  }

  onDelete(customer: ICustomer) {
    this.administrationService.deleteCustomer(customer.id).subscribe({
      next: () => {
        this.alertService.success(environment.title, 'Cliente eliminado correctamente');
        this.getCustomers();
      },
      error: (error) => {
        this.alertService.error(environment.title, error.error.message);
      },
      complete: () => {
      }
    });
  }

  onNew() {
    this.dataTransferForm = {
      data: {} as ICustomer,
      mode: Mode.new
    }
  }

  noneMode() {
    this.dataTransferForm = {
      data: {} as ICustomer,
      mode: Mode.none
    }
  }


}




