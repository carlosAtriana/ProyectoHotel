import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IRoom } from '../../../core/models/room';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { AlertService } from '../../../core/services/alert.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [TableModule, InputTextModule, TooltipModule, ButtonModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  @ViewChild('dt') dt: Table | undefined;

  @Output() update: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Output() delete: EventEmitter<IRoom> = new EventEmitter<IRoom>();
  @Input() listRooms: IRoom[] = [];

  alertService = inject(AlertService);

  onEdit(customer: IRoom) {
    this.update.emit(customer);
  }

  onDelete(customer: IRoom) {
    this.alertService.question(environment.title,
      `¿Está seguro en eliminar esta habitación?`,
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
