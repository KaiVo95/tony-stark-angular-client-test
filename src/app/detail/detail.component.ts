import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../models/product.model';
import { HttpServerService } from '../services/http-server.service';
import { DropDownModel } from '../models/dropdown.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  editProductForm: FormGroup;
  detailProduct = new ProductModel();
  dropdownData = new DropDownModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private httpServerService: HttpServerService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.fragment;
    this.buildProductForm();
    this.dropdownData = this.httpServerService.getDropDownData();
    if (code) {
      this.getDetail(code);
    }
  }

  buildProductForm(): void {
    this.editProductForm = this.fb.group(
      {
        code: this.fb.control('', [Validators.required]),
        name: this.fb.control('', [Validators.required]),
        category: this.fb.control('', [Validators.required]),
        brand: this.fb.control('', [Validators.required]),
        type: this.fb.control('', [Validators.required]),
        description: this.fb.control('', [Validators.required]),
        created_at: this.fb.control(''),
        updated_at: this.fb.control(''),
      });
  }

  setValueForm() {
    Object.keys(this.editProductForm.controls).forEach(item => {
      if (this.detailProduct.hasOwnProperty(item)) {
        const value = this.detailProduct[item];
        this.editProductForm.controls[item].setValue(value, { emitEvent: true });
      }
    });
  }

  getDetail(code: string): void {
    this.httpServerService.getDetail(code)
      .subscribe(
        data => {
          this.detailProduct = data;
          this.setValueForm();
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(code: any) {
    if (confirm("Are you sure to delete ?")) {
      this.httpServerService.deleteProduct(code)
        .subscribe(
          response => {
            if (response.status) {
              alert("sucessfull!");
              this.router.navigateByUrl(`/products`);
            }
          },
          error => {
            console.log(error);
          });
    }
  }

  updateProduct(code: any) {
    const formValue = this.editProductForm.value;
    const product = new ProductModel();
    product.name = formValue.name || '';
    product.category = formValue.category || '';
    product.brand = formValue.brand || '';
    product.type = formValue.type || '';
    product.description = formValue.description || '';
    this.httpServerService.updateProduct(code, product)
      .subscribe(
        response => {
          if (response) {
            alert("sucessfull!");
            this.router.navigateByUrl(`/products`);
          }
        },
        error => {
          console.log(error);
        });
  }

  cancel() {
    this.router.navigateByUrl(`/products`);
  }

}
