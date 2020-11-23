import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// lib
import * as bcrypt from 'bcryptjs';

// service
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

// model
import { User } from '../../_models/user';

declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class HeaderComponent implements OnInit {
  checkLogin = true;
  checkClickModalRegistor = true;
  checkClickModalLogin = true;
  returnUrl: string;
  users: User[];
  proCart: any = {};
  formLogin: FormGroup;
  isMobile = false;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  submitted = false;
  submittedLogin = false;
  formRegis: FormGroup;
  mobileWidth = 1366;

  keywords: string;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    // Reposive
    this.isMobile = this.width < this.mobileWidth;

    // lay du lieu user
    setTimeout(this.bannerSlider, 10);
    this.getUser();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loadproCart();

    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });


    this.formRegis = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      date: ['', Validators.required]
    });
  }

  searchProduct() {
    this.router.navigate(['/search', { keywords: this.keywords }]);
    setTimeout(() => {
      location.reload();
    }, 1);
  }


  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.isMobile = this.width < this.mobileWidth;
  }
  get f() { return this.formRegis.controls; }

  onRegis() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formRegis.invalid) {
      return;
    }

    const user = Object.assign({ ...this.formRegis.value }, { roleId: 1 });
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (!err) {
        user.password = hash;
        this.userService.CreateUser(user)
          .subscribe(result => {
            const res: any = result;
            if (res.success) {
              alert('Đăng kí thành công!');
            } else {
              alert('Tài khoản hoặc số điện thoại đã có người đăng ký');
            }
          }, error => console.error(error));
      } else {
        alert('Đăng kí không thành công');
        console.log('Error: ', err);
      }
    });
  }

  // load data from LS
  loadproCart() {
    if (localStorage.getItem('cart') === null) {
      this.proCart.length = 0;
    } else {
      this.proCart = JSON.parse(localStorage.getItem('cart'));
    }
  }

  modalLogin() {
    this.checkClickModalLogin = !this.checkClickModalLogin;
    this.checkClickModalRegistor = true;
  }

  modalRegistor() {
    this.checkClickModalLogin = true;
    this.checkClickModalRegistor = !this.checkClickModalRegistor;
  }

  getUser() {
    if (localStorage.getItem('currentUser') !== null) {
      this.userService.GetUser().subscribe(users => {
        this.users = users;
        this.checkLogin = false;
      });
    }
  }

  logout() {
    console.log('User is logouted');
    this.authService.logout();
    location.reload();
  }

  get fLogin() { return this.formLogin.controls; }

  login() {
    this.submittedLogin = true;
    if (this.formLogin.invalid) {
      return;
    }

    const val = this.formLogin.value;
    if (val.email && val.password) {
      this.userService.GetHash(val.email).subscribe(res => {
        const hash = res.toString();
        // giai ma hash
        bcrypt.compare(val.password, hash).then((reshash) => {
          if (reshash === true) {
            this.authService.login(val.email)
              .subscribe(() => location.reload());
          } else {
            window.alert('Sai tài khoản hoặc mật khẩu.');
          }
        });
      });
    }
  }

  // Banner slider
  bannerSlider() {
    $('.banner-slick').slick({
      speed: 600,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  // Show navigation bar
  filterActive() {
    // tslint:disable-next-line:quotemark
    $('#menu').css("visibility", 'visible');
    $('#inner').css('transform', 'translateX(0px)');
    $('.overlay').css('opacity', '1');
  }

  filterInactive() {
    $('#menu').css('visibility', 'hidden');
    $('#inner').css('transform', 'translateX(-100%)');
    $('.overlay').css('opacity', '0');
  }
}
