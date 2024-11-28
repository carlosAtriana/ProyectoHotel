import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() { }

  question(title: string, message: string, confirmText?: string, cancelText?: string) {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      customClass: {
        container: 'my-swal-container',
      },
      allowOutsideClick: false
    });
  }

  error(title: string, message: string) {
    return Swal.fire({
      title: 'Error',
      html: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  warning(title: string, message: string) {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }

  success(title: string, message: string): Promise<any> {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }
}