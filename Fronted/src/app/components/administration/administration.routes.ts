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
        path: 'room',
        loadComponent: () =>
          import('./room/room.component').then((m) => m.RoomComponent),
        title: 'Habitaciones',
      }
    ],
  },
];
