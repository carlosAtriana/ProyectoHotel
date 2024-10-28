import { Routes } from "@angular/router";
import { AdministrationComponent } from "./administration.component";
import { UserComponent } from "./user/user.component";


export const routes: Routes = [
    {
        path: '', 
        title: 'Administración',
        children: [
            {
                path: 'user', 
                loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
                title: 'Usuarios'
            }
        ]
    },

]