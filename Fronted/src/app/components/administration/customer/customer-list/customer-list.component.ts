import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ICustomer } from '../../../core/models/customer';
import { AlertService } from '../../../core/services/alert.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [TableModule, InputTextModule, TooltipModule, ButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  @ViewChild('dt') dt: Table | undefined;

  @Output() update: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() delete: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Input() listCustomers: ICustomer[] = []

  alertService = inject(AlertService);

  onEdit(customer: ICustomer) {
    this.update.emit(customer);
  }

  onDelete(customer: ICustomer) {
    this.alertService.question(environment.title,
      `¿Está seguro en eliminar este usuario?`,
      'Si', 'No').then(async (result) => {
        if (result.isConfirmed) {
          this.delete.emit(customer);
        }
      }
      )
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


}
