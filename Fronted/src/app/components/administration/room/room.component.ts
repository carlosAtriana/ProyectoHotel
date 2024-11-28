import { Component, inject } from '@angular/core';
import {  } from "../../shared/dynamic-table/dynamic-table.component";
import { Mode } from '../../core/enums/mode';
import { IdataTransferForm } from '../../core/models/data-transfer-form';
import { RoomInputFieldsComponent } from "./room-input-fields/room-input-fields.component";
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IRoom } from '../../core/models/room';
import { AdministrationService } from '../../core/services/administration.service';
import { AlertService } from '../../core/services/alert.service';
import { environment } from '../../../../environments/environment';
import { RoomListComponent } from "./room-list/room-list.component";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RoomInputFieldsComponent, ButtonModule, TooltipModule, RoomListComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  listRooms: IRoom[] = [];
  dataTransferForm: IdataTransferForm<IRoom> = {
    data: {} as IRoom,
    mode: Mode.none
  }
  mode: typeof Mode = Mode;

  administrationService = inject(AdministrationService);
  alertService = inject(AlertService);

  ngOnInit() {
    this.getAllRooms();
  }

  getAllRooms(){
    this.administrationService.getAllRooms().subscribe({
      next: (data) => {
        this.listRooms = data;
      },error: (error) => {
        this.alertService.error(environment.title, `Errror al obtener los datos de las habitaciones: ${error}`)
      }, complete: () => {}
    })
  }

  createRoom(room: IRoom) {
    this.administrationService.createRoom(room).subscribe({
      next: () => {
        this.alertService.success(environment.title, 'Habitación creada correctamente');
        this.getAllRooms();
        this.noneMode();
      },
      error: (error) => {
        this.alertService.error(environment.title, `Error al crear la habitación: ${error.error.message}`);
      },
      complete: () => {
      }
    });
  }

  onUpdate(room: IRoom) {
    this.dataTransferForm = {
      data: room,
      mode: Mode.edit
    }
  }

  update(room: IRoom) {
    this.administrationService.updateRoom(room).subscribe({
      next: () => {
        this.alertService.success(environment.title, 'Habitación actualizada correctamente');
      },
      error: (error) => {
        this.alertService.error(environment.title, `Error al actualizar la habitación: ${error.error.message}`);
      },
      complete: () => {
        this.getAllRooms();
        this.noneMode();
      }
    });
  }

  onDelete(room: IRoom) {
    this.administrationService.deleteRoom(room.id).subscribe({
      next: () => {
        this.alertService.success(environment.title, 'Habitación eliminada correctamente');
        this.getAllRooms();
      },
      error: (error) => {
        this.alertService.error(environment.title, `Error al eliminar la habitación: ${error.error.message}`);
      },
      complete: () => {
      }
    });
  }

  onNew() {
    this.dataTransferForm = {
      data: {} as IRoom,
      mode: Mode.new
    }
  }

  noneMode() {
    this.dataTransferForm = {
      data: {} as IRoom,
      mode: Mode.none
    }
  }


}


