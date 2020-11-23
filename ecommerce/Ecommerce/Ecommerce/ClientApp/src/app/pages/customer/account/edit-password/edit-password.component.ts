import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { UserService } from '../../../../_services/user.service';

import { User } from '../../../../_models/user';


//lib
import * as bcrypt from 'bcryptjs';



@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['../account.component.scss']
})
export class EditPasswordComponent implements OnInit {
  formEditPw: FormGroup;
  submittedPw = false;
  users: User[];
  constructor(private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.formEditPw = this.fb.group({
      oldPassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      newPassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      rePassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    });
  }

  getUser() {
    if (localStorage.getItem('currentUser') !== null)
      this.userService.GetUser().subscribe(users => {
        this.users = users;
      });
  }
  get fPw() { return this.formEditPw.controls; }


  EditPw() {
    this.submittedPw = true;
    // stop here if form is invalid
    if (this.formEditPw.invalid) {
      return;
    }
    const val = this.formEditPw.value;

    if (val.oldPassWord === val.newPassWord) {
      alert("Mật khẩu mới không được trùng với mật khẩu cũ.")
      return;
    }
    if (val.newPassWord !== val.rePassWord) {
      alert("Mật khẩu và nhập lại không đúng.")
      return
    }
    // goi api
    this.userService.GetHash(this.users[0].email).subscribe(res => {
      const hash = res.toString();
      //giai ma hash
      bcrypt.compare(val.oldPassWord, hash).then((res) => {
        if (res === true) {
          let x = val.newPassWord;
          bcrypt.hash(x, 10, (err, hash) => {
            if (!err) {
              x = hash;
              const user = {
                userId: this.users[0].userId,
                password: hash
              }
              //goi appi
              this.userService.UpdatePassword(user).subscribe(res => {
                if (!!res) {
                alert('Đổi mật khẩu thành công.')
                location.reload();
                }
              })
            } else {
              console.log('Error: ', err)
            }
          });
        } else alert('Sai mật khẩu.')
      });
    })
  }
}
