import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  users: User[];
  checkUrl = false;
  returnUrl: string
  header: string;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getUser();
    this.checkUrlHeader();

    setTimeout(() => {
      if (this.users === undefined) {
        alert('Vui lòng đăng nhập.');
        this.router.navigate(['/']);
      }
    }, 123);

  }

  getUser() {
    if (localStorage.getItem('currentUser') !== null)
      this.userService.GetUser().subscribe(users => {
        this.users = users;
      });
  }

  checkUrlHeader() {
    if (!this.route.snapshot.children[0].routeConfig.path) {
      this.checkUrl = true;
      this.header = 'Thông tin tài khoản'
    } else if (this.route.snapshot.children[0].routeConfig.path.toString() === 'address')
      this.header = 'Sổ địa chỉ';
    else if (this.route.snapshot.children[0].routeConfig.path.toString() === 'account')
      this.header = 'Thông tin tài khoản';
    else this.header = 'Quản lý đơn hàng'
  }

  changeUrl1() {
    this.header = 'Thông tin tài khoản'
  }
  changeUrl2() {
    this.header = 'Quản lý đơn hàng'
  }
  changeUrl3() {
    this.header = 'Sổ địa chỉ'
  }
}
