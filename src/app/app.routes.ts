import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { productDetailGuard } from './products/product-detail/product-detail.guard';
import { ProductShellComponent } from './products/product-list-alt/product-shell.component';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: ':alternate',
        component: ProductShellComponent,
      },
    ],
  },
  {
    path: 'products/:id',
    canActivate: [productDetailGuard],
    component: ProductDetailComponent,
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: ProductListComponent },
];
