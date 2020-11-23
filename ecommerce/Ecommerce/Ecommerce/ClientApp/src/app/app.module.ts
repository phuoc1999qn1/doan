import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// LIBRARY

// COMPONENT
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductPhoneComponent } from './pages/SmartPhone-Tablet/product-phone/product-phone.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductElectronicComponent } from './pages/Electronic/product-electronic/product-electronic.component';
import { Error404Component } from './pages/error404/error404.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AccountComponent } from './pages/customer/account/account.component';
import { DigitalDevicesComponent } from './pages/digital-devices/digital-devices.component';
import { ProductPhoneClassifyComponent } from './pages/SmartPhone-Tablet/product-phone-classify/product-phone-classify.component';
import { SearchComponent } from './pages/search/search.component';
import { AddressComponent } from './pages/customer/address/address.component';
import { OrderComponent } from './pages/customer/order/order.component';
import { ProductElectronicClassifyComponent } from './pages/Electronic/product-electronic-classify/product-electronic-classify.component';
import { PaymentComponent } from './pages/payment/payment.component';


// auth
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

// router
import { AppRoutingModule } from './app-routing.module';
import { EditAccountComponent } from './pages/customer/account/edit-account/edit-account.component';
import { EditPasswordComponent } from './pages/customer/account/edit-password/edit-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,

    // Product Pages
    ProductDetailComponent,
    ProductPhoneComponent,
    ProductPhoneClassifyComponent,
    ProductElectronicComponent,
    ProductElectronicClassifyComponent,

    // customer
    CustomerComponent,
    AddressComponent,
    OrderComponent,
    AccountComponent,
    EditAccountComponent,
    EditPasswordComponent,

    CartComponent,
    AdminComponent,
    ProductElectronicComponent,
    Error404Component,

    DigitalDevicesComponent,
    SearchComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
