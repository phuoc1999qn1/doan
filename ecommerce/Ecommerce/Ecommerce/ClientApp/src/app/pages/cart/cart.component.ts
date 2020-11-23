import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service
import { UserService } from '../../_services/user.service';

// model 
import { User } from '../../_models/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItem: any = {};
  totalPrice: number;
  users: User[];
  constructor(private userService: UserService,
    private router: Router) { }


  ngOnInit() {
    this.getUser();
    this.loadCartItem();

  }

  // lay du lieu
  getUser(): void {
    if (localStorage.getItem('currentUser') !== null) {
      this.userService.GetUser().subscribe(users => {
        this.users = users;
      });
    }
  }


  addCartItem(i) {
    let getdata: any = [];
    getdata = JSON.parse(localStorage.getItem('cart'));
    getdata[i] = ({ id: this.cartItem[i].id, name: this.cartItem[i].name, qty: this.cartItem[i].qty, price: this.cartItem[i].price, img: this.cartItem[i].img });
    localStorage.setItem('cart', JSON.stringify(getdata));

    // load total price 
    this.loadCartItem();
  }

  removeCartItem(i) {
    let getdata = [];
    getdata = JSON.parse(localStorage.getItem('cart'));
    // let filters = Object.assign({}, getdata);
    getdata = getdata.filter((e, idx) => idx != i)
    localStorage.setItem('cart', JSON.stringify(getdata));
    this.loadCartItem();
    location.reload();
  }


  // load item from LS
  loadCartItem(): void {
    this.totalPrice = 0;
    if (localStorage.getItem('cart') === null)
      this.cartItem.length = 0;
    else
      this.cartItem = JSON.parse(localStorage.getItem('cart'));
    for (let i in this.cartItem)
      this.totalPrice += parseInt(this.cartItem[i].price) * parseInt(this.cartItem[i].qty);
  }

  order() {
    if (this.users === undefined)
      window.alert("Vui lòng đăng nhập để thanh toán. ")
    else if (this.users[0].address == null) {
      window.alert("Vui lòng cập nhập địa chỉ để đặt hàng.")
      this.router.navigate(['/customer/address']);
    } else {
      this.router.navigate(['/payment']);
    }
  }
}
