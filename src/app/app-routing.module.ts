import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
	{ path: '', component: CustomersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:customer', component: CustomerComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
