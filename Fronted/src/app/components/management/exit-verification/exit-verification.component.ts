import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IReception } from '../../core/models/reception';
import { ManagementService } from '../../core/services/management.service';
import { AlertService } from '../../core/services/alert.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-exit-verification',
  standalone: true,
  imports: [TableModule, InputTextModule, TooltipModule, ButtonModule],
  templateUrl: './exit-verification.component.html',
  styleUrl: './exit-verification.component.css'
})
export class ExitVerificationComponent {

  listReception: IReception[] = [];

  managementService = inject(ManagementService);
  alertService = inject(AlertService);

  ngOnInit(){
    this.getAllReceptions();
  }

  getAllReceptions() {
    this.managementService.getAllReception().subscribe({
      next: (res) => {
        this.listReception = res;
      },error: (err) => { 
        this.alertService.error(environment.title ,err.error.message);
      },complete: () => {}
    })
  }

}
