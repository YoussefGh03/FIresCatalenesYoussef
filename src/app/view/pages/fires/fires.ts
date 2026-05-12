import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAIRS, Fira } from '../../../model/fairs';
import { SelectorComponent } from '../../elements/selector/selector';
import { LlistatComponent } from '../../elements/llistat/llistat';

@Component({
  selector: 'app-fires',
  standalone: true,
  imports: [CommonModule, SelectorComponent, LlistatComponent],
  template: `
    <div class="layout-fires">
      <app-selector 
        [comarques]="comarques" 
        [seleccionada]="comarcaTriada"
        (comarcaClicada)="filtrar($event)">
      </app-selector>

      <section class="contingut">
        @if (comarcaTriada) {
          <app-llistat 
            [nomComarca]="comarcaTriada" 
            [fires]="firesFiltrades"
            [idsFavorits]="idsFavorits"
            (canviFavorits)="gestionarFavorit($event.accio, $event.id)">
          </app-llistat>
        } @else {
          <div class="avís">Selecciona una comarca de la llista per veure les fires.</div>
        }
      </section>
    </div>
  `,
  styles: [`
    .layout-fires { display: grid; grid-template-columns: 300px 1fr; gap: 30px; padding: 20px; max-width: 1400px; margin: 0 auto; align-items: start; }
    .avís { padding: 40px; text-align: center; border: 2px dashed #ccc; border-radius: 8px; color: #666; font-size: 1.2rem; }
  `]
})
export class FiresComponent implements OnInit {
  comarques: string[] = [];
  firesFiltrades: Fira[] = [];
  comarcaTriada: string = '';
  idsFavorits: string[] = [];

  ngOnInit() {
    const llista = FAIRS.map(f => f.regionName);
    this.comarques = [...new Set(llista)].sort();
    
    // Carreguem els favorits en iniciar la pàgina
    this.carregarFavorits();
  }

  carregarFavorits() {
    this.idsFavorits = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
  }

  filtrar(comarca: string) {
    this.comarcaTriada = comarca;
    this.firesFiltrades = FAIRS.filter(f => f.regionName === comarca);
  }

  // Aquesta és la funció que faltava per fer funcionar el botó de guardar/eliminar
  gestionarFavorit(accio: string, id: string) {
    let ids = JSON.parse(localStorage.getItem('preferits_ids') || '[]');
    
    if (accio === 'guardar') {
      if (!ids.includes(id)) ids.push(id);
    } else {
      ids = ids.filter((i: string) => i !== id);
    }
    
    localStorage.setItem('preferits_ids', JSON.stringify(ids));
    
    // Actualitzem la llista local perquè el component de Llistat reaccioni al moment
    this.carregarFavorits();
  }
}