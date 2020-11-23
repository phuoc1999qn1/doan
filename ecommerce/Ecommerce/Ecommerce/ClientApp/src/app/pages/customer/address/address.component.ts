import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  formAddAddress: FormGroup;
  submitted = false;
  addressEdit = false;
  address: string;
  users: User[];

  constructor(private fAddress: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();

    setTimeout(() => {
      if (this.users) {
        this.address = this.users[0].address;
      }
    }, 100);

    this.formAddAddress = this.fAddress.group({
      address: [this.address, Validators.required]
    });
  }
  get f() { return this.formAddAddress.controls; }

  AddAddress() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formAddAddress.invalid) {
      return;
    }
    const val = this.formAddAddress.value;
    if (val.address) {
      const x = {
        userId: this.users[0].userId,
        address: val.address
      };
      this.userService.UpdateAddress(x).subscribe(res => {
        if (res) {
          alert('Cập nhập địa chỉ thành công.');
          location.reload();
        }
      });
    }

  }

  getUser() {
    if (localStorage.getItem('currentUser') !== null) {
      this.userService.GetUser().subscribe(users => {
        this.users = users;
      });
    }
  }

  edit() {
    this.addressEdit = true;
  }

}
