import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  catchError,
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  Subject,
} from 'rxjs';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Supplier } from '../../suppliers/supplier';

@Component({
  selector: 'pm-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  imports: [CurrencyPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  private errorMessageSubject = new Subject<string>();
  private productService = inject(ProductService);
  errorMessage$ = this.errorMessageSubject.asObservable();

  product$ = this.productService.selectedProduct$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  pageTitle$ = this.product$.pipe(
    map((p) => (p ? `Product Detail for: ${p.productName}` : null))
  );

  productSuppliers$ = this.productService.selectedProductsSuppliers$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$,
  ]).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle,
    }))
  );
}
