import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProducts: any[] = [];
  totalItems: number = 0;

  // setting paging
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  
  constructor(
    private router: Router,
    private httpServerService: HttpServerService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    // get total item -> we should to return total item on getProductsPaging.
    this.httpServerService.getAllProducts().subscribe(data => {
      if (data) {
        this.totalItems = data.length;
      }
    },
      error => {
        console.log(error);
      });

    // get products by paging
    this.httpServerService.getProductsPaging(this.page, this.pageSize).subscribe(data => {
      this.listProducts = data;
    },
      error => {
        console.log(error);
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getProducts();
  }

  detailProduct(code: string) {
    this.router.navigateByUrl(`/detail#${code}`);
  }
}
