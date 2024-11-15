import { Component, signal, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventManagerPlugin } from '@angular/platform-browser';
import { Subject } from 'rxjs';
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

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ButtonModule, InputTextModule, DialogModule, CalendarModule,
    FormsModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  listReservations: IReservation[] = [];

  managementService = inject(ManagementService);
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: this.convertToFullCalendarEvents(this.listReservations),
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  modalVisible: boolean = false;
  dataTranferForm: IdataTransferForm<IReservation> = {
    data: {} as IReservation,
    mode: Mode.none
  }
  
  ngOnInit() {
    this.getAllReservations();
  }

  convertToFullCalendarEvents(reservations: IReservation[]): any[] {
    return reservations.map(reservation => ({
      title: reservation.description,
      start: reservation.checkInDate.toISOString(),
      end: reservation.checkOutDate.toISOString(),
      extendedProps: {
        cantidadHuespedes: reservation.numberGuests,
        tipoHabitaciones: reservation.roomType
      }
    }));
  }

  showDialog() {
    this.modalVisible = !this.modalVisible;
  }

  alertService = inject(AlertService);


  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.showDialog();
    console.log('selected date', selectInfo.startStr);
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // console.log(calendarApi);
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

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  getAllReservations() {
    this.managementService.getAllReservations().subscribe({
      next: (res) => {
        this.listReservations = res;
        console.log('data received', this.listReservations);
      },
      error: (err) => {
        console.log('error', err);
        this.alertService.error(environment.title, 'Error obteniendo las reservas');
      },
      complete: () => {
        console.log('complete');
      }
    }
    );
  }

  onSubmit() {
    console.log('submit', this.dataTranferForm.data);
    this.managementService.createReservation(this.dataTranferForm.data).subscribe({
      next: (res) => {
        console.log('success', res);
        this.alertService.success(environment.title, 'Reserva creada correctamente');
        this.modalVisible = false;
      },
      error: (err) => {
        console.log('error', err);
        this.alertService.error(environment.title, 'Error creando la reserva');
      },
      complete: () => {
        console.log('complete');
      }
    }
    );
  }
}
