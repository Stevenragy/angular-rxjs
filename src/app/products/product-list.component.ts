import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';

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
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  // categories: ProductCategory[] = [];
  private productService = inject(ProductService);

  products$!: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
