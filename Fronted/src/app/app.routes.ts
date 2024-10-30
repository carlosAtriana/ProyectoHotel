import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    title: 'Pincipal',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'administration',
        loadChildren: () =>
          import('./components/administration/administration.routes').then(
            (m) => m.routesAdministration
          ),
      },
      {
        path: 'management',
        loadChildren: () =>
          import('./components/management/management.routes').then(
            (m) => m.routesManagement
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
