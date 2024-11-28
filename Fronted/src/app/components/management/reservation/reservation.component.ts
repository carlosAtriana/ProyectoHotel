import { Component, signal, ChangeDetectorRef, inject, ɵɵdeferOnHover } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AlertService } from '../../core/services/alert.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IdataTransferForm } from '../../core/models/data-transfer-form';
import { IReservation } from '../../core/models/reservation';
import { Mode } from '../../core/enums/mode';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ManagementService } from '../../core/services/management.service';
import { environment } from '../../../../environments/environment';
import { EventoRutina } from '../../core/models/envento-rutina';
import { DropdownModule } from 'primeng/dropdown';
import { AdministrationService } from '../../core/services/administration.service';
import { IRoom } from '../../core/models/room';
import { ICustomer } from '../../core/models/customer';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ButtonModule, InputTextModule, DialogModule, CalendarModule,
    FormsModule, DropdownModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  managementService = inject(ManagementService);
  administrationService = inject(AdministrationService);
  alertService = inject(AlertService);
  changeDetector = inject(ChangeDetectorRef);

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    initialView: 'dayGridMonth',
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: 'es',
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    //es para agreger eventos al calendario
    select: this.handleDateSelect.bind(this),
    //es para eliminar eventos del calendario
    eventClick: this.handleEventClick.bind(this),
    //es para actualizar eventos del calendario
    eventsSet: this.handleEvents.bind(this),
    eventAdd: this.getAllReservations.bind(this),
    /* you can update a remote database when these fire:
    eventChange:
    eventRemove:
    */
    eventMouseEnter: this.handleMouseEnter.bind(this),
    eventMouseLeave: this.handleMouseLeave.bind(this),
  });
  modalVisible: boolean = false;
  dataTranferForm: IdataTransferForm<IReservation> = {
    data: {} as IReservation,
    mode: Mode.none
  }
  _initData: IReservation = {} as IReservation;
  listReservations: IReservation[] = [];
  listRooms: IRoom[] = [];
  selectedRoom: IRoom = {} as IRoom;
  listCustomers: ICustomer[] = [];
  selectedCustomer: ICustomer = {} as ICustomer;
  headerDialog: string = '';
  textButtonDialog: string = '';
  eventInfo: any;
  eventTitle: any;
  eventStart: any;

  ngOnInit() {
    this.getAllReservations();
    this.getCustomers();
    this.getAllRooms();
  }

  handleMouseEnter(info: any) {
    info.el.style.backgroundColor = 'rgba(0, 0, 0, 0.788)';
    info.el.style.transition = 'background-color 0.1s ease';
    info.el.style.cursor = 'pointer';
    this.eventInfo = info.event.extendedProps;
    this.eventTitle = info.event._def.title;
    this.eventStart = info.event.start;
    const formattedDate = this.eventStart.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const eventInfoEl = document.getElementById('eventInfo');
    if (eventInfoEl) {
      const eventRect = info.el.getBoundingClientRect();
      const topPosition = eventRect.bottom + window.scrollY;
      const leftPosition = eventRect.left + window.scrollX;
      eventInfoEl.innerHTML = `
          <table>
            <tr>
              <td style="border: 1px solid #888686; padding: 5px;">Cliente:</td>
              <td style="border: 1px solid #888686; padding: 5px;">${this.eventTitle}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888686; padding: 5px;">Fecha reserva [día/mes/año]:</td>
              <td style="border: 1px solid #888686; padding: 5px;"> ${formattedDate}</td>
              </tr>
              <tr>
              <td style="border: 1px solid #888686; padding: 5px;">Tipo:</td>
              <td style="border: 1px solid #888686; padding: 5px;">${this.eventInfo.roomType}</td>
            </tr>
          </table>`;
      eventInfoEl.style.display = 'block';
      eventInfoEl.style.top = `${topPosition}px`;
      eventInfoEl.style.left = `${leftPosition}px`;
    }
  }

  handleMouseLeave(info: any) {
    info.el.style.backgroundColor = '';
    info.el.style.transition = 'background-color 0.1s ease';
    const eventInfoEl = document.getElementById('eventInfo');
    if (eventInfoEl) {
      eventInfoEl.style.display = 'none';
    }
  }

  showDialog(dataTranferForm: IdataTransferForm<IReservation>): void {
    if (dataTranferForm.mode === Mode.new) {
      this.headerDialog = 'Nueva Reserva';
      this.textButtonDialog = 'Guardar';
    } else if (dataTranferForm.mode === Mode.edit) {
      this.headerDialog = 'Editar Reserva';
      this.textButtonDialog = 'Actualizar';
      // Clonar el objeto para evitar modificar el original (inmutable)
      const clonedData = { ...dataTranferForm.data };
      // Convertir las fechas
      clonedData.checkInDate = new Date(dataTranferForm.data.checkInDate);
      if (dataTranferForm.data.checkOutDate) {
        clonedData.checkOutDate = new Date(dataTranferForm.data.checkOutDate);
      } else {
        clonedData.checkOutDate = null!; // O cualquier valor predeterminado
      }
      // Asignar la copia modificada al formulario
      dataTranferForm.data = clonedData;
      this._initData = { ...dataTranferForm.data };
    } else if (dataTranferForm.mode === Mode.none) {
      this.modalVisible = false;
    }
    this.modalVisible = true;
  }
  //con esto se puede alternar la visibilidad del calendario
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }
  //con esto se puede alternar si el calendario muestra los fines de semana
  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }
  //Este metodo se llama cuando se selecciona una fecha en el calendario
  handleDateSelect(selectInfo: DateSelectArg) {
    this.dataTranferForm = {
      data: {} as IReservation,
      mode: Mode.new
    };
    this.dataTranferForm.data.checkInDate = selectInfo.start;
    this.showDialog(this.dataTranferForm);
  }
  //Este metodo se llama cuando se hace click en un evento creado del calendario
  handleEventClick(clickInfo: EventClickArg) {
    this.dataTranferForm = {
      data: {} as IReservation,
      mode: Mode.edit
    };
    this.dataTranferForm.data = clickInfo.event.extendedProps as IReservation;
    this.showDialog(this.dataTranferForm);
  }
  //Este metodo se llama cuando se actualizan eventos del calendario
  handleEvents(events: EventApi[]) {
    this.changeDetector.detectChanges();
    this.listReservations = events.map(event => event.extendedProps as IReservation);
    this.changeDetector.detectChanges();
  }

  getAllReservations() {
    this.managementService.getAllReservations().subscribe({
      next: (res) => {
        this.listReservations = res;
        const eventos = this.convertReservationsToEvents(this.listReservations);
        this.calendarOptions.update((currentOptions) => ({
          ...currentOptions,
          events: eventos // Aquí agregamos los nuevos eventos
        }));
      },
      error: (err) => {
        this.alertService.error(environment.title, 'Error obteniendo las reservas' + err.error.message);
      },
      complete: () => { }
    }
    );
  }

  getCustomers() {
    this.administrationService.getAllCustomer().subscribe({
      next: (data) => {
        this.listCustomers = data;
        console.log("esta es la lista de customer", this.listCustomers)
      },
      error: (error) => {
        this.alertService.error(environment.title, `error al obtener clientes: ${error.error.message}`);
      },
      complete: () => { }
    });
  }

  getAllRooms() {
    this.administrationService.getAllRooms().subscribe({
      next: (data) => {
        this.listRooms = data;
      }, error: (error) => {
        this.alertService.error(environment.title, `Errror al obtener los datos de las habitaciones: ${error}`)
      }, complete: () => { }
    })
  }

  onCustomerChange(event: any) {

  }

  convertReservationsToEvents(reservations: IReservation[]): EventoRutina[] {
    return reservations.map(reservation => {
      const event = {
        title: `${reservation.sequential} - ${reservation.description}`,
        start: reservation.checkInDate,
        allDay: true,
        backgroundColor: '',
        extendedProps: {
          id: reservation.id,
          sequential: reservation.sequential,
          checkInDate: reservation.checkInDate,
          checkOutDate: reservation.checkOutDate,
          numberGuests: reservation.numberGuests,
          roomType: reservation.roomType,
          customerId: reservation.customerId,
          description: reservation.description,
        }
      };
      return event;
    });
  }
  onCreateUpdateReservation() {
    if (this.dataTranferForm.mode === Mode.new) {
      if (this.dataTranferForm.data.checkOutDate != null && this.dataTranferForm.data.checkOutDate != undefined) {
        this.dataTranferForm.data.checkInDate.setUTCHours(0, 0, 0, 0);
        this.dataTranferForm.data.checkOutDate.setUTCHours(0, 0, 0, 0);
      }
      this.managementService.createReservation(this.dataTranferForm.data).subscribe({
        next: () => {
          this.alertService.success(environment.title, 'Reserva creada correctamente');
        },
        error: (err) => {
          this.alertService.error(environment.title, `Error creando la reserva ${err.error.message}`);
          this.modalVisible = false;
        },
        complete: () => {
          this.modalVisible = false;
          this.getAllReservations();
        }
      }
      );
    } else if (this.dataTranferForm.mode === Mode.edit) {
      if (this.dataTranferForm.data.checkOutDate != null && this.dataTranferForm.data.checkOutDate != undefined) {
        this.dataTranferForm.data.checkInDate.setUTCHours(0, 0, 0, 0);
        this.dataTranferForm.data.checkOutDate.setUTCHours(0, 0, 0, 0);
      }
      if (JSON.stringify(this._initData) === JSON.stringify(this.dataTranferForm.data)) {
        this.modalVisible = false;
        return;
      } else {
        this.alertService.question(environment.title, `¿Está seguro que desea actualizar esta reserva?`,
          'Sí', 'No').then((result) => {
            if (result.isConfirmed) {
              this.managementService.updateReservation(this.dataTranferForm.data).subscribe({
                next: (res) => {
                  this.alertService.success(environment.title, 'Reserva actualizada correctamente');
                  this.modalVisible = false;
                },
                error: (err) => {
                  this.alertService.error(environment.title, 'Error actualizando la reserva' + err.error.message);
                },
                complete: () => {
                  this.getAllReservations();
                }
              });
            }
          });
      }
    }
  }

  confirmDeleteReservation(reservation: IReservation) {
    this.alertService.question(environment.title, `¿Está seguro que desea eliminar esta reserva?`,
      'Sí', 'No').then((result) => {
        if (result.isConfirmed) {
          this.delelteReservation(reservation);
        }
      });
  }

  delelteReservation(reservation: IReservation) {
    this.managementService.deleteReservation(reservation.id).subscribe({
      next: (res) => {
        this.alertService.success(environment.title, 'Reserva eliminada correctamente');
      },
      error: (err) => {
        this.alertService.error(environment.title, `Error eliminando la reserva ${err.error.message}`);
      },
      complete: () => {
        this.getAllReservations();
        this.modalVisible = false;
      }
    });
  }

}
