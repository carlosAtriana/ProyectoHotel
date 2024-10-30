import { Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterModule, MenubarModule, 
    MenuModule, CommonModule, AccordionModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

menuItem : any[] = [];
 

ngOnInit(): void {
    const menu = Object.assign([], environment.menu);
    this.menuItem = menu;
    
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
