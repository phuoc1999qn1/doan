import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// compponent
import { MenuComponent } from './pages/menu/menu.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductPhoneComponent } from './pages/SmartPhone-Tablet/product-phone/product-phone.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductElectronicComponent } from './pages/Electronic/product-electronic/product-electronic.component';
import { Error404Component } from './pages/error404/error404.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AccountComponent } from './pages/customer/account/account.component';
import { AddressComponent } from './pages/customer/address/address.component';
import { OrderComponent } from './pages/customer/order/order.component';
import { DigitalDevicesComponent } from './pages/digital-devices/digital-devices.component';
import { ProductPhoneClassifyComponent } from './pages/SmartPhone-Tablet/product-phone-classify/product-phone-classify.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductElectronicClassifyComponent } from './pages/Electronic/product-electronic-classify/product-electronic-classify.component';
import { PaymentComponent } from './pages/payment/payment.component';

// auth
import { AuthGuard } from './_helpers/auth.guard';
import { EditAccountComponent } from './pages/customer/account/edit-account/edit-account.component';
import { EditPasswordComponent } from './pages/customer/account/edit-password/edit-password.component';



const appRoutes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-phone', component: ProductPhoneComponent },
  { path: 'product-phone-classify', component: ProductPhoneClassifyComponent },
  { path: 'product-electronic', component: ProductElectronicComponent },
  { path: 'product-electronic-classify', component: ProductElectronicClassifyComponent },
  { path: 'product-digital', component: DigitalDevicesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'payment', component: PaymentComponent },

  {
    path: 'customer', component: CustomerComponent,
    children: [
      { path: '', component: AccountComponent },
      {
        path: 'account', component: AccountComponent, children: [
          { path: '', component: EditAccountComponent },
          { path: 'edit-account', component: EditAccountComponent },
          { path: 'edit-password', component: EditPasswordComponent }
        ]
      },
      { path: 'address', component: AddressComponent },
      { path: 'order', component: OrderComponent }
    ]
  },



  { path: '**', component: Error404Component },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
