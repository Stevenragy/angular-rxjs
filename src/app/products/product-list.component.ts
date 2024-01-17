import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  filter,
  map,
  Subject,
} from 'rxjs';

// import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CurrencyPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnChanges {
  // categories: ProductCategory[] = [];
  private productService = inject(ProductService);
  private productCategoryService = inject(ProductCategoryService);
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  pageTitle = 'Product List';
  errorMessage = '';
  // selectedCategoryId!: number;
  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      this.cdr.detectChanges();
      return EMPTY;
    })
  );

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, categoryId]) =>
      products.filter((product) =>
        categoryId ? product.categoryId === categoryId : true
      )
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onAdd(): void {
    console.log('Not yet implemented');
    this.productService.addNewProduct();
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
