import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FAIRS, Fira } from '../../../model/fairs';

@Component({
  selector: 'app-preferits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="preferits-container">
      <h2>Les meves Fires Preferides</h2>
      
      @if (firesPreferides.length > 0) {
        <div class="grid">
          @for (fira of firesPreferides; track fira.activityId) {
            <div class="card">
              <h4>{{ fira.activityName }}</h4>
              <p><strong>Comarca:</strong> {{ fira.regionName }}</p>
              <p><strong>Població:</strong> {{ fira.municipalityName }}</p>
              <div class="botons">
                <button [routerLink]="['/detall', fira.activityId]" class="btn-detall">Detall</button>
                <button (click)="eliminarPreferit(fira.activityId)" class="btn-delete">Eliminar</button>
              </div>
            </div>
          }
        </div>
      } @else {
        <p class="buit">Encara no has guardat cap fira a preferits.</p>
      }
    </div>
  `,
  styles: [`
    .preferits-container { padding: 20px; max-width: 1400px; margin: 0 auto; }
    h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
    .card h4 { margin: 0 0 10px 0; color: #333; }
    .card p { margin: 5px 0; color: #666; font-size: 0.95rem; }
    .botons { display: flex; gap: 10px; margin-top: 15px; }
    .botons button { padding: 8px; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1; border: none; }
    .btn-detall { background: #e2e8f0; color: #334155; }
    .btn-detall:hover { background: #cbd5e1; }
    .btn-delete { background: #ffebee; color: #c62828; }
    .btn-delete:hover { background: #ffcdd2; }
    .buit { font-size: 1.1rem; color: #666; font-style: italic; margin-top: 20px; }
  `]
})
export class PreferitsComponent implements OnInit {
  firesPreferides: Fira[] = [];

  ngOnInit() {
    this.carregarPreferits();
  }

  carregarPreferits() {
    const ids = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    this.firesPreferides = FAIRS.filter(f => ids.includes(f.activityId));
  }

  eliminarPreferit(id: string) {
    let ids = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    ids = ids.filter((guardatId: string) => guardatId !== id);
    localStorage.setItem('preferits_ids', JSON.stringify(ids));
    
    this.carregarPreferits();
  }
}