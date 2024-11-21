import { Component, signal, ChangeDetectorRef, inject } from '@angular/core';
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
  listReservations: IReservation[] = [];
  headerDialog: string = '';
  textButtonDialog: string = '';
  eventInfo: any;
  eventTitle: any;
  eventStart: any;

  ngOnInit() {
    this.getAllReservations();
  }

  handleMouseEnter(info: any) {
    console.log("mouseenter", info);
    this.eventInfo = info.event.extendedProps;
    this.eventTitle = info.event._def.title;
    this.eventStart = info.event.start;
    const eventInfoEl = document.getElementById('eventInfo');
    if (eventInfoEl) {      
      const eventRect = info.el.getBoundingClientRect();            
      const topPosition = eventRect.bottom + window.scrollY;
      const leftPosition = eventRect.left + window.scrollX;
  
      eventInfoEl.style.display = 'block';
      eventInfoEl.style.top = `${topPosition}px`;
      eventInfoEl.style.left = `${leftPosition}px`;
    }
  }
  handleMouseLeave(info: any) {
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
    }else if (dataTranferForm.mode === Mode.none) {
      this.modalVisible = false;
    }
    this.modalVisible = true;
  }
  
  managementService = inject(ManagementService);
  alertService = inject(AlertService);
  changeDetector = inject(ChangeDetectorRef);

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

    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     // id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  //Este metodo se llama cuando se hace click en un evento creado del calendario
  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
    this.dataTranferForm = {
      data: {} as IReservation,
      mode: Mode.edit
    };
    this.dataTranferForm.data = clickInfo.event.extendedProps as IReservation;
    this.showDialog(this.dataTranferForm);
    console.log("event", clickInfo.event.extendedProps);
    // this.dataTranferForm.data = clickInfo.event.extendedProps as IReservation;
    // this.dataTranferForm.mode = Mode.edit;
  }

  //Este metodo se llama cuando se actualizan eventos del calendario
  handleEvents(events: EventApi[]) {
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
    this.listReservations = events.map(event => event.extendedProps as IReservation);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
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
        this.alertService.error(environment.title, 'Error obteniendo las reservas'+ err.error.message);
      },
      complete: () => { }
    }
    );
  }

  convertReservationsToEvents(reservations: IReservation[]): EventoRutina[] {
    return reservations.map(reservation => {
      const event = {
        title: `${reservation.sequential} - ${reservation.description}`,
        start: reservation.checkInDate,
        allDay: true,
        backgroundColor: '',
        borderColor: '',
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
      if(this.dataTranferForm.data.checkOutDate != null && this.dataTranferForm.data.checkOutDate != undefined){
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
      this.dataTranferForm.data.checkInDate.setUTCHours(0, 0, 0, 0);
      this.dataTranferForm.data.checkOutDate.setUTCHours(0, 0, 0, 0);
      this.managementService.updateReservation(this.dataTranferForm.data).subscribe({
        next: (res) => {
          this.alertService.success(environment.title, 'Reserva actualizada correctamente');
          this.modalVisible = false;
        },
        error: (err) => {
          this.alertService.error(environment.title, 'Error actualizando la reserva'+ err.error.message);
        },
        complete: () => {
          this.getAllReservations();
        }
      });
    }
  }

  delelteReservation(reservation: IReservation) {
    this.managementService.deleteReservation(reservation.id).subscribe({
      next: (res) => {
        this.alertService.success(environment.title, 'Reserva eliminada correctamente');
        this.modalVisible = false;
      },
      error: (err) => {
        this.alertService.error(environment.title, 'Error eliminando la reserva');
      },
      complete: () => {
        this.getAllReservations();
      }
    });
  }

}
