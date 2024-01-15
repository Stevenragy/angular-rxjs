import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData } from './products/product-data';
// import { ProductCategoryData } from './product-categories/product-category-data';
// import { SupplierData } from './suppliers/supplier-data';
import { Product } from './products/product';
// import { ProductCategory } from './product-categories/product-category';
// import { Supplier } from './suppliers/supplier';

export class AppData implements InMemoryDbService {
  createDb(): {
    products: Product[];
  } {
    const products = ProductData.products;

    return {
      products: products,
    };
  }
}
