import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.product = {
      id: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      categoryId: 2,
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      quantityInStock: 3,
      supplierIds: [1],
    };
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
