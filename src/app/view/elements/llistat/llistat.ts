import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Fira } from '../../../model/fairs';

@Component({
  selector: 'app-llistat',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h3>Fires de la comarca: {{ nomComarca }}</h3>
    <div class="grid">
      @for (fira of fires; track fira.activityId) {
        <div class="card">
          <h4>{{ fira.activityName }}</h4>
          <p><strong>Població:</strong> {{ fira.municipalityName }}</p>
          <p><strong>Data:</strong> {{ fira.date }}</p>
          
          <div class="botons">
            <button [routerLink]="['/detall', fira.activityId]" class="btn-detall">Veure detall</button>
            
            @if (esFavorit(fira.activityId)) {
              <button (click)="eliminar(fira.activityId)" class="btn-delete">Eliminar favorit</button>
            } @else {
              <button (click)="guardar(fira.activityId)" class="btn-fav">Guardar favorit</button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    h3 { color: #0056b3; margin-top: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
    .card h4 { margin: 0 0 10px 0; color: #333; font-size: 1.1rem; }
    .card p { margin: 5px 0; color: #666; font-size: 0.95rem; flex-grow: 1; }
    .botons { display: flex; gap: 10px; margin-top: 15px; }
    .botons button { padding: 8px; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1; border: none; font-size: 0.9rem; }
    .btn-detall { background: #e2e8f0; color: #334155; }
    .btn-fav { background: #0056b3; color: white; }
    .btn-delete { background: #ffebee; color: #c62828; }
  `]
})
export class LlistatComponent {
  @Input() fires: Fira[] = [];
  @Input() nomComarca: string = '';
  @Input() idsFavorits: string[] = []; // Rebem la llista actualitzada de la Home
  
  @Output() canviFavorits = new EventEmitter<{accio: string, id: string}>();

  esFavorit(id: string): boolean {
    return this.idsFavorits.includes(id);
  }

  guardar(id: string) {
    this.canviFavorits.emit({accio: 'guardar', id});
  }

  eliminar(id: string) {
    this.canviFavorits.emit({accio: 'eliminar', id});
  }
}