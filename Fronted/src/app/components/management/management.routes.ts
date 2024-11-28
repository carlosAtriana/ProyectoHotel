import { Routes } from '@angular/router';

export const routesManagement: Routes = [
  {
    path: '',
    title: 'Gestión',
    children: [
      {
        path: 'reservation',
        loadComponent: () =>
          import('./reservation/reservation.component').then((m) => m.ReservationComponent
          ),
        title: 'Reservas',
      },
      {
        path: 'reception',
        loadComponent: () =>
          import('./reception/reception.component').then((m) => m.ReceptionComponent),
        title: 'Recepción',
      },
      {
        path: 'point-of-sale',
        loadComponent: () =>
          import('./point-of-sale/point-of-sale.component').then((m) => m.PointOfSaleComponent),
        title: 'Punto de Venta',
      }, 
      {
        path: 'exit-verification',
        loadComponent: () =>
          import('./exit-verification/exit-verification.component').then((m) => m.ExitVerificationComponent),
        title: 'Verificación de Salida',
      }
    ],
  },
];
