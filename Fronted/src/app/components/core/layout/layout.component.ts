import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 

ngOnInit(): void {

    const Mostrarmenu = (headerToggle: string, navbarId: string) => {
      const toggleBtn = document.getElementById(headerToggle);
      const nav = document.getElementById(navbarId);
      if (headerToggle && navbarId) {
        toggleBtn?.addEventListener("click", () => {
          nav?.classList.toggle("show-menu");
          toggleBtn.classList.toggle("bx-x");
        });
      }
    };
    Mostrarmenu("header-toggle", "navbar");
    
    const linkcolor = document.querySelectorAll(".nav__link");
    
    // Especificar el tipo de `this`
    function colorLink(this: HTMLElement) {
      linkcolor.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
    
    linkcolor.forEach((item) => item.addEventListener("click", colorLink));
  }

}
