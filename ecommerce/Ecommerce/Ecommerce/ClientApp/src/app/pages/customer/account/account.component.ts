import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  formEditInf: FormGroup;
  formEditPw: FormGroup;
  submitted = false;
  submittedPw = false;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formEditInf = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.formEditPw = this.fb.group({
      oldPassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      newPassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      rePassWord: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    });
  }


  get f() { return this.formEditInf.controls; }
  get fPw() { return this.formEditPw.controls; }

  EditInf() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formEditInf.invalid) {
      return;
    }
  }

  EditPw() {
    this.submittedPw = true;
    // stop here if form is invalid
    if (this.formEditPw.invalid) {
      return;
    }
  }
}
