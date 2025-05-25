import { Routes } from '@angular/router';
import { FranchiseComponent } from './features/franchise/franchise.component';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'franchise',
    pathMatch: 'full'
  },
  {
    path: 'franchise',
    component: FranchiseComponent
  }
];
