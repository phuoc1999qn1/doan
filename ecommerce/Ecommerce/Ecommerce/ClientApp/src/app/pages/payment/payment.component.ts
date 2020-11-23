import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// service
import { UserService } from '../../_services/user.service';
import { OrderService } from '../../_services/order.service';

// model 
import { User } from '../../_models/user';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cartItem: any = {};
  rates: number;
  totalPrice: number;
  finalAmount = 0;
  users: User[];
  paymentDone = false;

  @ViewChild('paypalRef', { static: true })
  private paypalRef: ElementRef;

  @ViewChild('paypalLink', { static: true })
  private paypalLink: ElementRef;

  @ViewChild('cashLink', { static: true })
  private cashLink: ElementRef;

  constructor(private render: Renderer2,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.getUser();
    this.loadCartItem();
    this.paypalPayment();
    this.currency();
  }

  private paypalPayment(): void {
    const usdExchange = localStorage.getItem('USDVND');
    this.finalAmount = Math.round(this.totalPrice / parseFloat(usdExchange));

    paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          label: 'paypal',
          tagline: 'false'
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.finalAmount,
                  currency_code: 'USD'
                }
              }
            ]
          })
        },

        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert('Thanh toan ok')
            this.cashPayment();
          });
        },

        onError: error => {
          console.log(error);
        }
      }
    ).render(this.paypalRef.nativeElement);
  }

  // Kiểm tra click hình thức thanh toán
  private buttonAction(inputElement: HTMLInputElement): void {
    switch (inputElement.value) {
      case 'isPayPalClick': {
        this.render.setStyle(this.cashLink.nativeElement, 'display', 'none');
        this.render.setStyle(this.paypalLink.nativeElement, 'display', 'block');
        break;
      }
      case 'isCashClick': {
        this.render.setStyle(this.cashLink.nativeElement, 'display', 'block');
        this.render.removeStyle(this.paypalLink.nativeElement, 'display');
        break;
      }
    }
  }

  private currency() {
    fetch('http://api.currencylayer.com/live?access_key=3a66641a5a44eaa51343e6c5bc4a6bec')
      .then(response => response.json())
      .then(data => this.rates = data.quotes.USDVND)
      .then(data => localStorage.setItem('USDVND', data));
  }


  getUser(): void {
    if (localStorage.getItem('currentUser') !== null) {
      this.userService.GetUser().subscribe(users => {
        this.users = users;
      });
    } else {
      alert('Vui lòng đăng nhập.');
      this.router.navigate(['/']);
    }
  }

  // load item from LS
  loadCartItem(): void {
    this.totalPrice = 0;
    if (localStorage.getItem('cart') === null) {
      this.router.navigate(['/']);
    } else {
      this.cartItem = JSON.parse(localStorage.getItem('cart'));
    }

    this.cartItem.forEach(i => {
      this.totalPrice += parseInt(i.price) * parseInt(i.qty);
    });

  }

  cashPayment() {
    const order = {
      userId: this.users[0].userId,
      address: this.users[0].address,
      country: 'VietNam'
    };
    this.orderService.CreateOrder(order).subscribe(res => {
      const data: any = res;
      const orderId = data.orderId;
      let count = 0;

      this.cartItem.forEach(e => {
        const orderDetail = {
          unitPrice: e.price,
          quantity: e.qty,
          discount: 0,
          status: 1,
          orderId: orderId,
          proDetailsId: e.id
        };
        this.orderService.CreateOrderDetail(orderDetail).subscribe(res1 => {
          count++;
          if (count === this.cartItem.length) {
            this.paymentDone = true;
            localStorage.removeItem('cart');
            alert('Thanh toán thành công.');
            location.reload();
          }
        });
      });
    });
  }
}
