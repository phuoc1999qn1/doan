import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../_services/user.service';

import { User } from '../../../../_models/user';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['../account.component.scss']
})
export class EditAccountComponent implements OnInit {
  formEditInf: FormGroup;
  submitted = false;
  users: User[];
  constructor(private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser(() => {
      this.formEditInf = this.fb.group({
        fullName: [this.users[0].fullName, Validators.required],
        phoneNumber: [this.users[0].phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        email: [this.users[0].email, [Validators.required, Validators.email]]
      });
    });
  }

  getUser(callback) {
    if (localStorage.getItem('currentUser') !== null)
      this.userService.GetUser().subscribe(users => {
        this.users = users;
        callback();
      });
  }

  get f() { return this.formEditInf.controls; }

  EditInf() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formEditInf.invalid) {
      return;
    }
    const val = this.formEditInf.value;
    if (val.fullName && val.phoneNumber && val.email) {
      const x = {
        userId: this.users[0].userId,
        fullName: val.fullName,
        phoneNumber: 0 + val.phoneNumber.toString(),
        email: val.email,
      }
      this.userService.UpdateUser(x).subscribe(res => {
        if (res) {
          alert('Cập nhập địa chỉ thành công.')
          location.reload();
        }
        else
          alert('Cập nhập địa chỉ thành công. Email hoặc sđt đã tồn tại.');
      });
    }
  }
}
