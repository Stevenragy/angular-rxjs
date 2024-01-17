import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { catchError, EMPTY, Subject } from 'rxjs';

import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pm-product-list-alt',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list-alt.component.html',
  // providers: [ProductService],
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject<string>();
  private productService = inject(ProductService);
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.productsWithCategory$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  selectedProduct$ = this.productService.selectedProduct$;

  onSelected(productId: number): void {
    this.productService.productSelectedSubject.next(productId);
  }
}
