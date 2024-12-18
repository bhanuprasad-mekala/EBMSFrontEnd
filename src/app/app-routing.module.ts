import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { CalculateBillComponent } from './calculate-bill/calculate-bill.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"EBMSFrontEnd/customer",
    component:CustomersComponent
  },
  {
    path:"calculate-bill",
    component:CalculateBillComponent
  },
  {
    path:"view-bills",
    component:ViewBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
