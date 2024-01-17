import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
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
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<string>();
  private productService = inject(ProductService);
  errorMessage$ = this.errorMessageSubject.asObservable();
  productSuppliers: Supplier[] | null = null;

  product$ = this.productService.selectedProduct$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
}
