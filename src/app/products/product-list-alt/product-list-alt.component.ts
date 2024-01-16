import { ChangeDetectionStrategy, Component } from '@angular/core';

import { catchError, EMPTY, Subject } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pm-product-list-alt',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list-alt.component.html',
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.productsWithCategory$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  // selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    // this.productService.selectedProductChanged(productId);
  }
}
