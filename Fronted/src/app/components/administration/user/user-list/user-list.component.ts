import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IUser } from '../../../core/models/user';
import { AlertService } from '../../../core/services/alert.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, InputTextModule,TooltipModule,ButtonModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
@ViewChild('dt') dt: Table | undefined;

@Output() editUser: EventEmitter<IUser> = new EventEmitter<IUser>();
@Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();
@Input() listUsers: IUser[] = []
alertService = inject(AlertService);

onEdit(user: IUser){
  this.editUser.emit(user);
}

onDelete(user: IUser){
  this.alertService.question(environment.title, 
   `¿Está seguro en eliminar este usuario?`,
      'Si', 'No').then(async (result) => {
        if (result.isConfirmed) {
          this.deleteUser.emit(user);
        }
      }
  )
 
}

applyFilterGlobal($event: any, stringVal: any) {
  this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}
}
