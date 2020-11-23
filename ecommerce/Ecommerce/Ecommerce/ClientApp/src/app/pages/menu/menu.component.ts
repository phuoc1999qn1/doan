import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


declare var $;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '(window:resize)': 'onWindowResize($event)' }
})
export class MenuComponent implements OnInit {
  stock = 0;
  id: number;
  public allProduct: any = [];
  contactFlag = true;
  public listCategoryName: any = {
    data: []
  };
  checkHover = true;
  isMobile = false;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  mobileWidth = 1366;

  productsPhone: any = {
    data: [],
    totalRecord: 0,
    page: 0,
    totalPages: 0,
  };

  contact: any = {
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
    };

  categories: any = [
    {
      name: 'Điện thoại máy tính bảng',
      image: 'https://salt.tikicdn.com/ts/category/93/27/e3/192b0ebe1d4658c51f9931bda62489b2.png'
    },
    {
      name: 'Điện thoại Smartphone',
      image: 'https://salt.tikicdn.com/cache/280x280/ts/product/5a/7b/e1/5acd19c60380413b3e72ac3460da0f62.jpg'
    },
    {
      name: 'Máy tính bảng',
      image: 'https://salt.tikicdn.com/cache/280x280/ts/product/d9/7a/32/0996fcf1395e3120d6dba80583ff6cd9.jpg'
    },
    {
      name: 'Thực phẩm tươi sống',
      image: 'https://salt.tikicdn.com/ts/category/a6/9f/45/460fdecbbe0f81da09c7da37aa08f680.png'
    },
    {
      name: 'Đồ Chơi - Mẹ & Bé',
      image: 'https://salt.tikicdn.com/ts/category/66/15/4f/6282e8c6655cb87cb226e3b701bb9137.png'
    },
    {
      name: 'Làm Đẹp - Sức Khỏe',
      image: 'https://salt.tikicdn.com/ts/category/85/13/02/d8e5cd75fd88862d0f5f647e054b2205.png'
    },
    {
      name: 'Điện thoại máy tính bảng',
      image: 'https://salt.tikicdn.com/ts/category/93/27/e3/192b0ebe1d4658c51f9931bda62489b2.png'
    },
    {
      name: 'Điện thoại máy tính bảng',
      image: 'https://salt.tikicdn.com/ts/category/93/27/e3/192b0ebe1d4658c51f9931bda62489b2.png'
    },
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  }



  ngOnInit() {
    this.isMobile = this.width < this.mobileWidth;
    setTimeout(this.slider, 100);
    setTimeout(this.sliderTime, 1);

    this.getProductPhone(1);
    // this.random(1, 200)
    this.getProductRandom(this.random(1, 431));
    this.getProductRandom(this.random(1, 431));
    this.getProductRandom(this.random(1367, 1535));
    this.getProductRandom(this.random(1367, 1535));
    this.getProductRandom(this.random(1367, 1535));
    // console.log(parseInt(this.random(1, 200)))

  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.isMobile = this.width < this.mobileWidth;
  }

  random(min, max) {
    // tslint:disable-next-line:radix
    return parseInt(Math.random() * (max - min) + min);
  }

  getProductRandom(id) {
    this.http.post(`${environment.SERVER_URL}/ProductDetail/get-by-id`, { id }).subscribe((result) => {

      let getProduct: any = {};
      getProduct = result;
      getProduct = getProduct.data;
      this.allProduct.push(getProduct);
    });
  }

  // Load sản phẩm điện thoại - máy tính bảng
  getProductPhone(cPage) {
    const x = {
      page: cPage,
      size: 48,
      keyword: '',
      categoryId: 1,
    };
    this.http
      .post(
        `${environment.SERVER_URL}/ProductDetail/get-product-by-categoryName-linq`,
        x
      )
      .subscribe(
        (result) => {
          this.productsPhone = result;
          this.productsPhone = this.productsPhone.data;
        },
        (error) => console.error(error)
      );
  }

  // Lấy tên loại sản phẩm để hiển thị trên danh mục sản phẩm
  getCateProductName(id) {
    const x = {
      categoryId: id
    };
    this.http.post(`${environment.SERVER_URL}/Product/get-cateproduct-by-id`, x)
      .subscribe(result => {
      }, error => console.error(error));
  }

  // Thêm thông tin liên lạc
  addContact() {
    const x = this.contact;

    if (x.fullName === '' || x.email === '' || x.phoneNumber === '' || x.message === '') {
      this.contactFlag = false;
    } else {
      this.contactFlag = true;
      this.http.post(`${environment.SERVER_URL}/Contact/create-contact`, x).subscribe(result => {
        const res: any = result;
        if (res.success) {
          this.contact = res.data;
          alert('Thêm mới thành công!');
          location.reload();
        }
      }, error => console.error(error));
    }
  }

  slider() {
    $('.menu-banner-slick').slick({
      speed: 600,
      autoplay: true,
      autoplaySpeed: 10000,
      infinite: true,
      slidesToScroll: 1,
      prevArrow: '.slick-btn-prev',
      nextArrow: '.slick-btn-next'
    });
  }

  sliderTime() {
    $('.slider-list').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 3,
      prevArrow: '.prev',
      nextArrow: '.next'
    });
  }



  // check2 = !this.check1;
}
