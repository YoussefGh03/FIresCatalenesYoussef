import { Routes } from '@angular/router';
import { HomeComponent } from './view/pages/home/home';
import { FiresComponent } from './view/pages/fires/fires';
import { PreferitsComponent } from './view/pages/preferits/preferits';
import { DetallComponent } from './view/pages/detall/detall';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fires', component: FiresComponent },
  { path: 'preferits', component: PreferitsComponent },
  { path: 'detall/:id', component: DetallComponent },
  { path: '**', redirectTo: '' }
];