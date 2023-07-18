import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDownModel } from '../models/dropdown.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private REST_API_SERVER = 'http://localhost:61001/api/products';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  dropdownData = new DropDownModel();
  listCategories: string[] = [];
  listBrands: string[] = [];
  listTypes: string[] = [];
  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<any> {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getProductsPaging(pageNumber: number, size: number): Observable<any> {
    const url = `${this.REST_API_SERVER}?page=${pageNumber}&size=${size}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  //  this way will be affect to performance but we don't have table category, brand and type
  public getDropDownData() {
    this.getAllProducts().subscribe(data => {
      if (data) {
        for (var i in data) {
          this.listCategories.push(data[i].category)
          this.listBrands.push(data[i].brand)
          this.listTypes.push(data[i].type)
        }
      }
      this.listCategories = [...new Set(this.listCategories)]
      this.listBrands = [...new Set(this.listBrands)]
      this.listTypes = [...new Set(this.listTypes)]
    })
    const dropDownvalue = new DropDownModel();
    dropDownvalue.listTypes = this.listTypes;
    dropDownvalue.listBrands = this.listBrands;
    dropDownvalue.listCategories = this.listCategories;
    return dropDownvalue;
  }

  public getDetail(code: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/${code}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public createProduct(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient.post<any>(url, data);
  }

  public updateProduct(code: string, data: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/${code}`;
    return this.httpClient.put<any>(url, data);
  }

  public deleteProduct(code: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/${code}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  // public validateCode(code: string): string {
  //   let message = null;
  //   this.getAllProducts().subscribe(data => {
  //     if (data) {
  //       let result = data.find(item => item.code === code);
  //       if (result != null) {
  //         message = 'Code already exists';
  //       }
  //     }
  //   })
  //   return message;
  // }
}
