import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DetailComponent } from './detail/detail.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "detail", component: DetailComponent },
  { path: "new-product", component: NewProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [ProductsComponent, DetailComponent, NewProductComponent];