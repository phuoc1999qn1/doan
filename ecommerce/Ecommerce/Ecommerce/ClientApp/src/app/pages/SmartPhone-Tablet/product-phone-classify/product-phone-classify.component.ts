import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";

declare var $;
@Component({
  selector: 'app-product-phone-classify',
  templateUrl: './product-phone-classify.component.html',
  styleUrls: ['./product-phone-classify.component.scss']
})
export class ProductPhoneClassifyComponent implements OnInit {
  public res: any;
  // public proName: any;
  public listCategoryName: [];
  index: number = 0;
  public listProduct: {};
  flag: string = "1";
  productId: number;
  public keywords: any;

  products: any = {};
  productsQuantity: any = {};

  // chua data proDetail
  tempPro: any = {
    data: [],
  };

  constructor(private activate: ActivatedRoute,
    private http: HttpClient,
    @Inject("BASE_URL") baseUrl: string) { }

  ngOnInit() {
    let proId;

    this.activate.paramMap.subscribe((params) => {
      proId = params.get("proId");
    });

    this.slickSlider();
    this.getProductDetailByProductId(1, parseInt(proId));
    this.getCateProductName(1);
    this.getProductNameByProId(parseInt(proId));
    this.getProDetailQuantity(parseInt(proId));
  }

  // Lấy tên loại sản phẩm để hiển thị trên danh mục sản phẩm
  getCateProductName(id) {
    var x = {
      categoryId: id
    }
    this.http.post(`${environment.SERVER_URL}/Product/get-cateproduct-by-id`, x)
      .subscribe(result => {
        this.res = result;
        this.listCategoryName = this.res.data;
      }, error => console.error(error));
  }

  // Lấy tên phân loại sản phẩm vd: Điện thoại smartphone, điện thoại bàn,...
  getProductNameByProId(id) {
    var x = {
      productId: id
    }
    this.http.post(`${environment.SERVER_URL}/Product/get-productName-by-productId`, x)
      .subscribe(result => {
        let proName: any = {};
        proName = result;
        proName = proName.data
        this.listProduct = proName;
      }, error => console.error(error));
  }

  slickSlider() {
    $(".slick-banner").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: ".prev",
      nextArrow: ".next",
    });
  }

  // Lấy sản phẩm theo tên/id loại sản phẩm
  getProductDetailByProductId(cPage, id) {
    let x = {
      productId: id,
      page: cPage,
      size: 12
    }
    this.http.post(`${environment.SERVER_URL}/Product/get-product-detail-by-product-id`, x).subscribe(result => {
      this.productId = id;
      this.products = result;
      this.products = this.products.data;
    }, error => console.error(error));
  }

  // Lấy số lượng sản phẩm theo tên/id loại sản phẩm
  getProDetailQuantity(id) {
    let x = {
      productId: id,
    }
    this.http.post(`${environment.SERVER_URL}/Product/get-product-detail-by-product-id-no-pagination`, x).subscribe(result => {
      // this.productId = id;
      this.productsQuantity = result;
      this.productsQuantity = this.productsQuantity.data;
    }, error => console.error(error));
  }

  // flag = 1 => Phân trang tất cả sản phẩm
  // flag = 2 => Phân trang sản phẩm theo tên loại sản phẩm
  searchNext() {
    if (this.flag == "1") {
      if (this.products.page < this.products.totalPages) {
        let nextPage = this.products.page + 1;
        let x = {
          productId: this.productId,
          page: nextPage,
          size: 12
        };
        this.http.post(`${environment.SERVER_URL}/Product/get-product-detail-by-product-id`, x).subscribe(result => {
          this.products = result;
          this.products = this.products.data;
        }, error => console.error(error));
      } else {
        alert("Bạn đang ở trang cuối cùng!");
      }
    }
    else {
      if (this.products.page < this.products.totalPages) {
        let nextPage = this.products.page + 1;
        let x = {
          page: nextPage,
          size: 48,
          keyword: "",
          categoryId: 1,
        };
        this.http
          .post(`${environment.SERVER_URL}/ProductDetail/get-product-by-categoryName-linq`, x)
          .subscribe((result) => {
            this.products = result;
            this.products = this.products.data;
          },
            (error) => console.error(error)
          );
      } else {
        alert("Bạn đang ở trang cuối cùng!");
      }
    }

  }

  searchPrevious() {
    if (this.flag == "1") {
      if (this.products.page > 1) {
        let previousPage = this.products.page - 1;
        let x = {
          productId: this.productId,
          page: previousPage,
          size: 12
        };
        this.http.post(`${environment.SERVER_URL}/Product/get-product-detail-by-product-id`, x).subscribe(result => {
          this.products = result;
          this.products = this.products.data;
        }, error => console.error(error));
      } else {
        alert("Bạn đang ở trang đầu tiên!");
      }
    }

    else {
      if (this.products.page > 1) {
        let previousPage = this.products.page - 1;
        let x = {
          page: previousPage,
          size: 48,
          keyword: "",
          categoryId: 1,
        };
        this.http
          .post(`${environment.SERVER_URL}/ProductDetail/get-product-by-categoryName-linq`, x)
          .subscribe(
            (result) => {
              this.products = result;
              this.products = this.products.data;
            },
            (error) => console.error(error)
          );
      } else {
        alert("Bạn đang ở trang đầu tiên!");
      }
    }

  }

}
