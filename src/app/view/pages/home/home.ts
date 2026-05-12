import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAIRS, Fira } from '../../../model/fairs';
import { SelectorComponent } from '../../elements/selector/selector';
import { LlistatComponent } from '../../elements/llistat/llistat';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SelectorComponent, LlistatComponent, RouterLink],
  template: `
    <div class="container">
      <section class="seccio-preferits">
        <h2>Els teus darrers preferits</h2>
        <div class="mini-grid" *ngIf="preferides.length > 0; else noFavs">
          @for (fira of preferides.slice(0,3); track fira.activityId) {
            <div class="mini-card">
              <p><strong>{{ fira.activityName }}</strong></p>
              <a [routerLink]="['/detall', fira.activityId]">Veure més</a>
            </div>
          }
        </div>
        <ng-template #noFavs><p class="text-buit">No tens cap fira guardada encara.</p></ng-template>
      </section>

      <hr>

      <section class="seccio-cerca">
        <h2>Cerca fires per comarca</h2>
        <div class="layout-cerca">
          <app-selector [comarques]="comarques" [seleccionada]="comarcaTriada" (comarcaClicada)="filtrar($event)"></app-selector>
          <app-llistat [nomComarca]="comarcaTriada" [fires]="firesFiltrades"></app-llistat>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .mini-grid { display: flex; gap: 15px; margin-bottom: 20px; }
    .mini-card { background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; flex: 1; display: flex; flex-direction: column; justify-content: space-between;}
    .mini-card a { color: #0056b3; font-weight: bold; text-decoration: none; margin-top: 10px; display: inline-block; }
    .mini-card a:hover { text-decoration: underline; }
    .text-buit { color: #666; font-style: italic; }
    .layout-cerca { display: grid; grid-template-columns: 250px 1fr; gap: 20px; margin-top: 20px; align-items: start; }
    hr { margin: 40px 0; border: 0; border-top: 1px solid #eee; }
  `]
})
export class HomeComponent implements OnInit {
  comarques: string[] = [];
  firesFiltrades: Fira[] = [];
  comarcaTriada: string = '';
  preferides: Fira[] = [];

  ngOnInit() {
    const llista = FAIRS.map(f => f.regionName);
    this.comarques = [...new Set(llista)].sort();
    this.carregarPreferits();
  }

  carregarPreferits() {
    const ids = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    this.preferides = FAIRS.filter(f => ids.includes(f.activityId));
  }

  filtrar(comarca: string) {
    this.comarcaTriada = comarca;
    this.firesFiltrades = FAIRS.filter(f => f.regionName === comarca);
  }
}