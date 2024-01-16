import { Component } from '@angular/core';
import { ProductListAltComponent } from './product-list-alt.component';
import { ProductDetailComponent } from './product-detail.component';

@Component({
  standalone: true,
  templateUrl: './product-shell.component.html',
  imports: [ProductListAltComponent, ProductDetailComponent],
})
export class ProductShellComponent {}
