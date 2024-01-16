import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { catchError, EMPTY } from 'rxjs';

// import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CurrencyPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
})
export class ProductListComponent {
  // categories: ProductCategory[] = [];
  private productService = inject(ProductService);
  pageTitle = 'Product List';
  errorMessage = '';

  products$ = this.productService.products$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      this.cdr.detectChanges();
      return EMPTY;
    })
  );

  constructor(private cdr: ChangeDetectorRef) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
