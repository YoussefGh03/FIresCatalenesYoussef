import { Component, Input } from '@angular/core';
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
            <button (click)="guardarFavorit(fira.activityId)" class="btn-fav">Guardar favorit</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    h3 { color: #0056b3; margin-top: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; transition: transform 0.2s ease; }
    .card:hover { transform: translateY(-3px); box-shadow: 0 6px 12px rgba(0,0,0,0.1); }
    .card h4 { margin: 0 0 10px 0; color: #333; font-size: 1.1rem; }
    .card p { margin: 5px 0; color: #666; font-size: 0.95rem; flex-grow: 1; }
    .botons { display: flex; gap: 10px; margin-top: 15px; }
    .botons button { padding: 8px; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1; border: none; font-size: 0.9rem; }
    .btn-detall { background: #e2e8f0; color: #334155; }
    .btn-detall:hover { background: #cbd5e1; }
    .btn-fav { background: #fff3cd; border: 1px solid #ffe69c; color: #664d03; }
    .btn-fav:hover { background: #ffecb5; }
  `]
})
export class LlistatComponent {
  @Input() fires: Fira[] = [];
  @Input() nomComarca: string = '';

  guardarFavorit(id: string) {
    const ids = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem('preferits_ids', JSON.stringify(ids));
      alert('Fira afegida a preferits!');
    } else {
      alert('Aquesta fira ja està als teus preferits.');
    }
  }
}