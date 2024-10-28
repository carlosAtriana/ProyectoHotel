import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "../core/layout/layout.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ RouterOutlet,  LayoutComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
