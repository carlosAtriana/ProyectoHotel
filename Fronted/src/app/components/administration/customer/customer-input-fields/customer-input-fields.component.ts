import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Mode } from '../../../core/enums/mode';
import { AlertService } from '../../../core/services/alert.service';
import { IdataTransferForm } from '../../../core/models/data-transfer-form';
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ICustomer } from '../../../core/models/customer';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-customer-input-fields',
  standalone: true,
  imports: [AccordionModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './customer-input-fields.component.html',
  styleUrl: './customer-input-fields.component.css'
})
export class CustomerInputFieldsComponent {

  @ViewChild('form') form!: NgForm;
  @Input() dataTransferForm: IdataTransferForm<ICustomer> = {} as IdataTransferForm<ICustomer>;
  @Output() update: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() add: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();
  private _initData: ICustomer = {} as ICustomer;
  toggleInputs: boolean = true;
  inputHeader: string = "Nuevo";
  buttonLabel: string = ""

  alertService = inject(AlertService);
  ngOnChanges(changes: SimpleChanges): void {
    const dataTransferForm = changes['dataTransferForm'].currentValue;
    const { mode, data } = dataTransferForm;
    switch (mode) {
      case Mode.edit:
        this.inputHeader = "Editar"
        this.buttonLabel = "Editar"
        this.toggleInputs = true;
        this._initData = { ...data };
        break;
      case Mode.new:
        this.toggleInputs = true;
        this.inputHeader = "Nuevo";
        this.buttonLabel = "Aceptar"
        break;
    }
  }
  onAceptar(): void {
    const { data: currentData, mode } = this.dataTransferForm;
    switch (mode) {
      case Mode.edit:
        if (JSON.stringify(this._initData) === JSON.stringify(currentData)) {
          this.onCancelar();
        } else {
          this.alertService.question(environment.title,
            `¿Está seguro en editar este cliente?.`,
            'Si', 'No').then((result: any) => {
              if (result.isConfirmed) {
                this.update.emit(currentData);
              }
            });
        }
        break;
      case Mode.new:
        this.add.emit(currentData);
        break;
    }
  }
  onCancelar(): void {
    this.cancelar.emit();
  }
}




