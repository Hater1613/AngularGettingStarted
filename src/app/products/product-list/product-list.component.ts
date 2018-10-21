import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  showImages: boolean = true;
  imageWidth: number = 80;
  imageMargin: number = 2;
  pageTitle: string = "Product List";
  products: IProduct[];
  filteredProducts: IProduct[];
  _productNameFilter: string;

  get productNameFilter(): string {
    return this._productNameFilter;
  }
  set productNameFilter(value: string) {
    this._productNameFilter = value;
    this.filteredProducts = this._productNameFilter ? this.filterProducts() : this.products;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(x => {
      this.products = x;
      this.filteredProducts = this.products;
    });
  }

  toggleImages() {
    this.showImages = !this.showImages;
  }

  filterProducts(): IProduct[] {
    var filterBy = this._productNameFilter.toLocaleLowerCase();

    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onNotify(message: string) {
    alert(message);
  }
}
