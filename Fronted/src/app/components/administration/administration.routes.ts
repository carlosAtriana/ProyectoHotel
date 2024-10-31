import { Routes } from '@angular/router';

export const routesAdministration: Routes = [
  {
    path: '',
    title: 'Administración',
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
        title: 'Usuarios',
      },
      {
        path: 'customer',
        loadComponent: () =>
          import('./customer/customer.component').then((m) => m.CustomerComponent),
        title: 'Clientes'
      },
      {
        path: 'room',
        loadComponent: () =>
          import('./room/room.component').then((m) => m.RoomComponent),
        title: 'Habitaciones',
      },
      {
        path: 'sale',
        loadComponent: () =>
          import('./sale/sale.component').then((m) => m.SaleComponent),
        title: 'Ventas'
      }
    ],
  },
];
