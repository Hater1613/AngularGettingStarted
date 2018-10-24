import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle : string = 'Product Detail';
  product: IProduct;
  productId: number;

  constructor(
      private productService: ProductService,
      private router: Router,
      route: ActivatedRoute) {
    this.productId = +route.snapshot.paramMap.get('id');
  }
  
  ngOnInit() {
    this.productService.getProducts().subscribe(x => {
      this.product = x.find(k => k.productId === this.productId);
    });
  }

  onBack() {
    this.router.navigate(['products']);
  }
}
