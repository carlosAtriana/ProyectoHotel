import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../shared/dynamic-table/dynamic-table.component";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  title: any[] = ['ID', 'Nombre', 'Description', 'Capacidad', 'Precio', 'Estado']

  data: any[] = [
    {
      ID: 1,
      Nombre: 'Habitacion 1',
      Description: 'Habitacion con capacidad para 6 personas',
      Capacidad: 6,
      Precio: 100000,
      Estado: 'Disponible'
    },
    {
      ID: 2,
      Nombre: 'Habitacion 2',
      Description: 'Habitacion con capacidad para 8 personas',
      Capacidad: 8,
      Precio: 150000,
      Estado: 'Disponible'
    },
    {
      ID: 3,
      Nombre: 'Habitacion 3',
      Description: 'Habitacion con capacidad para 10 personas',
      Capacidad: 10,
      Precio: 200000,
      Estado: 'Disponible'
    },
    {
      ID: 4,
      Nombre: 'Habitacion 4',
      Description: 'Habitacion con capacidad para 12 personas',
      Capacidad: 12,
      Precio: 250000,
      Estado: 'Disponible'
    },
    {
      ID: 5,
      Nombre: 'Habitacion 5',
      Description: 'Habitacion con capacidad para 14 personas',
      Capacidad: 14,
      Precio: 300000,
      Estado: 'Ocupado'
    },
    {
      ID: 6,
      Nombre: 'Habitacion 6',
      Description: 'Habitacion con capacidad para 16 personas',
      Capacidad: 16,
      Precio: 350000,
      Estado: 'Disponible'
    },
    {
      ID: 7,
      Nombre: 'Habitacion 7',
      Description: 'Habitacion con capacidad para 18 personas',
      Capacidad: 18,
      Precio: 400000,
      Estado: 'Ocupado'
    },
    {
      ID: 8,
      Nombre: 'Habitacion 8',
      Description: 'Habitacion con capacidad para 20 personas',
      Capacidad: 20,
      Precio: 450000,
      Estado: 'Disponible'
    },
    {
      ID: 9,
      Nombre: 'Habitacion 9',
      Description: 'Habitacion con capacidad para 22 personas',
      Capacidad: 22,
      Precio: 500000,
      Estado: 'Disponible'
    },
    {
      ID: 10,
      Nombre: 'Habitacion 10',
      Description: 'Habitacion con capacidad para 24 personas',
      Capacidad: 24,
      Precio: 550000,
      Estado: 'Ocupado'
    },
    {
      ID: 11,
      Nombre: 'Habitacion 11',
      Description: 'Habitacion con capacidad para 26 personas',
      Capacidad: 26,
      Precio: 600000,
      Estado: 'Limpieza'
    },
    {
      ID: 12,
      Nombre: 'Habitacion 12',
      Description: 'Habitacion con capacidad para 28 personas',
      Capacidad: 28,
      Precio: 650000,
      Estado: 'Disponible'
    },
    {
      ID: 13,
      Nombre: 'Habitacion 13',
      Description: 'Habitacion con capacidad para 30 personas',
      Capacidad: 30,
      Precio: 700000,
      Estado: 'Ocupado'
    },
    {
      ID: 14,
      Nombre: 'Habitacion 14',
      Description: 'Habitacion con capacidad para 32 personas',
      Capacidad: 32,
      Precio: 750000,
      Estado: 'Disponible'
    },
    {
      ID: 15,
      Nombre: 'Habitacion 15',
      Description: 'Habitacion con capacidad para 34 personas',
      Capacidad: 34,
      Precio: 800000,
      Estado: 'Ocupado'
    },
    {
      ID: 16,
      Nombre: 'Habitacion 16',
      Description: 'Habitacion con capacidad para 36 personas',
      Capacidad: 36,
      Precio: 850000,
      Estado: 'Disponible'
    },
    {
      ID: 17,
      Nombre: 'Habitacion 17',
      Description: 'Habitacion con capacidad para 38 personas',
      Capacidad: 38,
      Precio: 900000,
      Estado: 'Ocupado'
    },
    {
      ID: 18,
      Nombre: 'Habitacion 18',
      Description: 'Habitacion con capacidad para 40 personas',
      Capacidad: 40,
      Precio: 950000,
      Estado: 'Disponible'
    },
    
  ]
}

