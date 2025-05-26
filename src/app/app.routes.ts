import { Routes } from '@angular/router';
import { FranchisesComponent } from './features/franchises/page/franchises.component';
import { BranchesComponent } from './features/branches/page/branches.component';
import { ProductsComponent } from './features/products/page/products.component';
import { BranchProductsComponent } from './features/branch-products/page/branch-products.component';


export const routes: Routes = [
    {
    path: '',
    redirectTo: 'franchise',
    pathMatch: 'full'
  },
  {
    path: 'franchise',
    component: FranchisesComponent
  },
  {
    path: 'branches',
    component: BranchesComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'branch-products',
    component: BranchProductsComponent
  }
];
