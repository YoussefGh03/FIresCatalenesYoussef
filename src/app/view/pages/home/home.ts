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
          @for (fira of preferides.slice(-4).reverse(); track fira.activityId) {
            <div class="mini-card">
              <p><strong>{{ fira.activityName }}</strong></p>
              <div class="mini-botons">
                <a [routerLink]="['/detall', fira.activityId]">Detall</a>
                <button (click)="gestionarFavorit('eliminar', fira.activityId)" class="btn-text-delete">Eliminar</button>
              </div>
            </div>
          }
        </div>
        <ng-template #noFavs><p class="text-buit">No tens cap fira guardada.</p></ng-template>
      </section>

      <hr>

      <section class="seccio-cerca">
        <h2>Cerca fires per comarca</h2>
        <div class="layout-cerca">
          <app-selector [comarques]="comarques" [seleccionada]="comarcaTriada" (comarcaClicada)="filtrar($event)"></app-selector>
          
          <app-llistat 
            [nomComarca]="comarcaTriada" 
            [fires]="firesFiltrades"
            [idsFavorits]="idsFavorits"
            (canviFavorits)="gestionarFavorit($event.accio, $event.id)">
          </app-llistat>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .mini-grid { display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; }
    .mini-card { background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; flex: 1; min-width: 200px; }
    .mini-botons { display: flex; justify-content: space-between; margin-top: 10px; border-top: 1px solid #eee; padding-top: 8px; }
    .btn-text-delete { background: none; border: none; color: #c62828; cursor: pointer; padding: 0; font-weight: bold; }
    .layout-cerca { display: grid; grid-template-columns: 250px 1fr; gap: 20px; margin-top: 20px; }
    hr { margin: 40px 0; border: 0; border-top: 1px solid #eee; }
  `]
})
export class HomeComponent implements OnInit {
  comarques: string[] = [];
  firesFiltrades: Fira[] = [];
  comarcaTriada: string = '';
  preferides: Fira[] = [];
  idsFavorits: string[] = [];

  ngOnInit() {
    const llista = FAIRS.map(f => f.regionName);
    this.comarques = [...new Set(llista)].sort();
    this.actualitzarEstatFavorits();
  }

  // Aquesta funció llegeix el LocalStorage i actualitza totes les variables de la vista
  actualitzarEstatFavorits() {
    this.idsFavorits = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    this.preferides = FAIRS.filter(f => this.idsFavorits.includes(f.activityId));
  }

  gestionarFavorit(accio: string, id: string) {
    let ids = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    
    if (accio === 'guardar') {
      if (!ids.includes(id)) ids.push(id);
    } else {
      ids = ids.filter((i: string) => i !== id);
    }
    
    localStorage.setItem('preferits_ids', JSON.stringify(ids));
    
    // Al cridar aquesta funció, la Home es refresca i li envia els nous IDs al Llistat
    this.actualitzarEstatFavorits();
  }

  filtrar(comarca: string) {
    this.comarcaTriada = comarca;
    this.firesFiltrades = FAIRS.filter(f => f.regionName === comarca);
  }
}