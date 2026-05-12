import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="logo">
        <h1>Fires Catalanes</h1>
      </div>
      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inici</a>
        <a routerLink="/fires" routerLinkActive="active">Cercar Fires</a>
        <a routerLink="/preferits" routerLinkActive="active">Preferits</a>
      </nav>
    </header>
  `,
  styles: [`
    .header { background: #0056b3; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo h1 { margin: 0; font-size: 1.5rem; }
    .nav { display: flex; gap: 15px; }
    .nav a { color: white; text-decoration: none; padding: 8px 15px; border-radius: 5px; transition: 0.3s; }
    .nav a:hover { background: rgba(255,255,255,0.2); }
    .active { background: white !important; color: #0056b3 !important; font-weight: bold; }
  `]
})
export class HeaderComponent {}