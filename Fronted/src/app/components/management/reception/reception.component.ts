import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ManagementService } from '../../core/services/management.service';
import { AlertService } from '../../core/services/alert.service';
import { environment } from '../../../../environments/environment';
import { IRoom } from '../../core/models/room';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { IdataTransferForm } from '../../core/models/data-transfer-form';
import { ReceptionInputFieldsComponent } from "./reception-input-fields/reception-input-fields.component";
import { Mode } from '../../core/enums/mode';
import { IReception } from '../../core/models/reception';

interface ITabView {
  title: string;
  content: string;
}

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, TabViewModule, DialogModule, DropdownModule,
    CalendarModule, FormsModule, ReceptionInputFieldsComponent],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent {
  tabs: ITabView[] = [];
  listRooms: IRoom[] = [];
  modalVisible: boolean = false;
  headerDialog: string = '';
  visibleBlock: boolean = false;
  room: IRoom = {} as IRoom;

  mode: typeof Mode = Mode;
  
  managementService = inject(ManagementService);
  alertService = inject(AlertService);

  listReception: IReception[] = [];

  ngOnInit() {
    this.tabs = [
      { title: 'Todo', content: 'Tab 1 Content' },
      { title: 'Piso 1', content: 'Tab 1 Content' },
      { title: 'Piso 2', content: 'Tab 2 Content' },
      { title: 'Piso 3', content: 'Tab 3 Content' }
    ];
    this.getAllRooms();
    this.getAllReception();
  }

  getAllRooms() {
    this.managementService.getAllRooms().subscribe({
      next: (res) => {
        this.listRooms = res;
      },
      error: (err) => {
        this.alertService.error(environment.title, `Error al obtener las reservas: ${err.message}`)
      },
      complete: () => { }
    })
  }

  getAllReception(){
    this.managementService.getAllReception().subscribe({
      next: (res) => {
        this.listReception = res;
      }, error: (err) => {
        this.alertService.error(environment.title, `Error al obtener las reservas: ${err.message}`)
      }, complete: () => { }
    })
  }

  bookRoom(room: IRoom) {
    this.visibleBlock = true;
    this.room = room;
  }

  cancel(){
    this.visibleBlock = false;
    this.getAllReception();
    this.getAllRooms();
  }

  onRetirar(room: IRoom){
    const removeReception = this.listReception.find(r => r.room.id === room.id);
    const dataCurrent = new Date()
    removeReception!.checkOutDate = dataCurrent;
    this.alertService.question(environment.title, '¿Está seguro que desea retirar la habitación?', 'Sí', 'No')
    .then((result) => {
      if (result.isConfirmed) {
        this.managementService.retirarReception(removeReception).subscribe({
          next: () => {
            this.alertService.success(environment.title, 'Hotel retirado correctamente');
            this.getAllRooms();
          }, error: (err) => {
            this.alertService.error(environment.title, `Error al retirar el hotel: ${err.message}`)
          }, complete: () => { }
        })
      }
    });
  }

}
