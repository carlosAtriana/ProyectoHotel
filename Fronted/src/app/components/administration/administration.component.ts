import { Component } from '@angular/core';
import { UserComponent } from "./user/user.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [UserComponent, RouterOutlet],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {

}
