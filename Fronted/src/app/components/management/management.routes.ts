import { Routes } from '@angular/router';

export const routesManagement: Routes = [
  {
    path: '',
    title: 'Gestión',
    children: [
      {
        path: 'reservation',
        loadComponent: () =>
          import('./reservation/reservation.component').then(
            (m) => m.ReservationComponent
          ),
        title: 'Reservaciones',
      },
    ],
  },
];
