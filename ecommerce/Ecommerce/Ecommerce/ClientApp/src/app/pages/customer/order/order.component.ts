import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { OrderService } from 'src/app/_services/order.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  users: User[];
  order: any = [];
  constructor(private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getUser(() => {
      this.orderService.GetOrder(this.users[0].userId).subscribe(x => {
        this.order = x;
        this.order.forEach(e => {
          e.orderDate = e.orderDate.slice(0, 10);
        });
      });
    });
  }

  getUser(callback) {
    if (localStorage.getItem('currentUser') !== null) {
      this.userService.GetUser().subscribe(users => {
        this.users = users;
        callback();
      });
    }
  }

}
