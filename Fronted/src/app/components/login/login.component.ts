import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, InputTextModule, PasswordModule, CardModule, CheckboxModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible: boolean = true;
  router = inject(Router)

  formulario : FormGroup;
  fb = inject(FormBuilder);

  constructor()
  {
    this.formulario = this.fb.group({
      usuario : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      clave : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    })
  }

  loguear()
  {
    if(this.formulario.valid)
    {
      this.router.navigate(['/main']);
    }
  }

 
}
