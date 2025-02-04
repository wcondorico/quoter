import { Routes } from '@angular/router';
import { QuoterComponent } from './quoter/quoter.component';

export const routes: Routes = [
  { path: '**', 
    redirectTo: 'quoter',
    pathMatch: 'full'
  },
  { path: 'quoter',
    component: QuoterComponent 
  },
];
