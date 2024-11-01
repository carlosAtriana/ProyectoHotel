import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  innerWidth?: string;
  es = environment.esI18N;

  constructor(private config: PrimeNGConfig){
   
  }

  ngOnInit(): void {
    this.config.setTranslation(this.es);
  }
}
