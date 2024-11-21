import { Component, inject } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { IdataTransferForm } from '../../core/models/data-transfer-form';
import { Mode } from '../../core/enums/mode';
import { UserInputFieldsComponent } from "./user-input-fields/user-input-fields.component";
import { IUser } from '../../core/models/user';
import { AdministrationService } from '../../core/services/administration.service';
import { AlertService } from '../../core/services/alert.service';
import { environment } from '../../../../environments/environment';
import { UserListComponent } from "./user-list/user-list.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TooltipModule, ButtonModule, UserInputFieldsComponent, UserListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  dataTransferForm: IdataTransferForm<IUser> = {
    data: {} as IUser,
    mode: Mode.none
  }
  listUsers: IUser[] = [];
  mode: typeof Mode = Mode;
  administrationService = inject(AdministrationService)
  alertService = inject(AlertService)

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.administrationService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsers = res;
      }, error: (err) => {
        this.alertService.error(environment.title, `Error al obtener los usuarios ${err.message}`);
      }, complete: () => { }
    })
  }

  onSave(user: IUser) {
    if (this.dataTransferForm.mode === Mode.new) {
      this.administrationService.createUser(user).subscribe({
        next: (res) => {
          this.alertService.success(environment.title, `Usuario creado correctamente`);
          this.getAllUsers();
        }, error: (err) => {
          this.alertService.error(environment.title, `Error al crear el usuario ${err.message}`);
        }, complete: () => {
          this.getAllUsers()
          this.onCancel();
        }
      })
    }
  }

  onEditUser(user: IUser) {
    this.dataTransferForm = {
      data: user,
      mode: Mode.edit
    }
  }
  update(user: IUser) {
    this.administrationService.updateUser(user).subscribe({
      next: (res) => {
        this.alertService.success(environment.title, `Usuario actualizado correctamente`);
        this.getAllUsers();
      }, error: (err) => {
        this.alertService.error(environment.title, `Error al actualizar el usuario ${user.name} ${err.message}`);
      }, complete: () => {
        this.getAllUsers();
        this.onCancel();
      }
    })
  }
  deleteUser(user: IUser) {
    this.administrationService.deleteUser(user.id).subscribe({
      next: (res) => {
        this.alertService.success(environment.title, `Usuario ${user.name} eliminado correctamente`);
        this.getAllUsers();
      }, error: (err) => {
        this.alertService.error(environment.title, `Error al eliminar el usuario ${user.name} ${err.message}`);
      }, complete: () => { }
    })
  }

  onNew() {
    this.dataTransferForm = {
      data: {} as IUser,
      mode: Mode.new
    }
  }

  onCancel() {
    this.dataTransferForm = {
      data: {} as IUser,
      mode: Mode.none
    }
    this.getAllUsers();
  }

}