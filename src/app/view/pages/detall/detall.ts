import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FAIRS, Fira } from '../../../model/fairs';

@Component({
  selector: 'app-detall',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="detall-container" *ngIf="fira">
      <button (click)="tornar()" class="btn-back">Tornar enrere</button>
      <div class="card-detall">
        <span class="badge">{{ fira.regionName }}</span>
        <h1>{{ fira.activityName }}</h1>
        <div class="info-grid">
          <div>
            <p><strong>Població:</strong> {{ fira.municipalityName }} ({{ fira.location }})</p>
            <p><strong>Data:</strong> {{ fira.date }}</p>
            <p><strong>Periodicitat:</strong> {{ fira.periodicityName }}</p>
          </div>
          <div>
            <p><strong>Contacte:</strong> {{ fira.organizerPhone }}</p>
            <p><strong>Email:</strong> {{ fira.email || 'No disponible' }}</p>
            <p *ngIf="fira.web"><strong>Web:</strong> <a [href]="fira.web" target="_blank">Visitar web</a></p>
          </div>
        </div>
        <div class="desc">
          <h3>Productes i temàtica</h3>
          <p>{{ fira.products }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detall-container { padding: 40px; max-width: 900px; margin: 0 auto; }
    .card-detall { background: white; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 5px solid #0056b3; }
    .btn-back { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-bottom: 20px; font-weight: 500; transition: 0.2s; }
    .btn-back:hover { background: #e2e8f0; }
    .badge { background: #e0f0ff; color: #0056b3; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;}
    h1 { color: #1e293b; margin-top: 15px; margin-bottom: 20px;}
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; color: #334155;}
    .desc { background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px; color: #475569;}
    .desc h3 { margin-top: 0; color: #1e293b; }
  `]
})
export class DetallComponent implements OnInit {
  fira?: Fira;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.fira = FAIRS.find(f => f.activityId === id);
  }

  tornar() { this.location.back(); }
}