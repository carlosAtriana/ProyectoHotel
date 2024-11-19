import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { AlertService } from '../../core/services/alert.service';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
})
export class DynamicTableComponent {
  @ViewChild('dt') dt: Table | undefined;
  @Input() titleColumn: any[] = [];
  @Input() body: any[] = [];
  @Input() titleTable: string = '';
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  alertService = inject(AlertService);

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  ngOnInit(): void {
  }
  onEdit(data: any): void {
    this.edit.emit(data);
  }

  onDelete(data: any): void {
    this.alertService
      .question('sdf', `¿Está seguro en eliminar el sistema?`, 'Si', 'No')
      .then(async (result) => {
        if (result.isConfirmed) {
          this.delete.emit(data);
        }
      });
  }
}
