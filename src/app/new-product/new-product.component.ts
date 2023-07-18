import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';
import { DropDownModel } from '../models/dropdown.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  addProductForm: FormGroup;
  dropdownData = new DropDownModel();
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpServerService: HttpServerService) { }

  ngOnInit(): void {
    this.buildProductForm();
  }

  buildProductForm(): void {
    this.addProductForm = this.fb.group(
      {
        code: this.fb.control('', [Validators.required]),
        name: this.fb.control('', [Validators.required]),
        category: this.fb.control('', [Validators.required]),
        brand: this.fb.control('', [Validators.required]),
        type: this.fb.control('', [Validators.required]),
        description: this.fb.control('', [Validators.required]),
      });
  }

  saveProduct() {
    const product = {
      code: this.addProductForm.get('code').value || '',
      name: this.addProductForm.get('name').value || '',
      category: this.addProductForm.get('category').value || '',
      brand: this.addProductForm.get('brand').value || '',
      type: this.addProductForm.get('type').value || '',
      description: this.addProductForm.get('description').value || '',
    };
    this.httpServerService.createProduct(product)
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
}
