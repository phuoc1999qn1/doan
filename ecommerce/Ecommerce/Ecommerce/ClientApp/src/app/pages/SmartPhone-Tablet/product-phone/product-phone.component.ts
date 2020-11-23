import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

declare var $;
@Component({
  selector: "app-product-phone",
  templateUrl: "./product-phone.component.html",
  styleUrls: ["./product-phone.component.scss"],
})
export class ProductPhoneComponent implements OnInit {
  public res: any;
  public listCategoryName: [];
  public listProduct: [];
  flag: string = "1";
  productId = "";
  keywords: string;

  productQuantity: any = {};

  products: any = {
    data: [],
    totalRecord: 0,
    page: 0,
    totalPages: 0,
  };

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) { }

  ngOnInit() {
    $(".slick-banner").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: ".prev",
      nextArrow: ".next",
    });

    this.getProduct(1);
    this.getCateProductName(1);
    this.getProductQuantity(1);
  }

  //lay danh sach tat ca san pham
  getProduct(cPage) {
    let x = {
      page: cPage,
      size: 48,
      keyword: "",
      categoryId: 1,
    };
    this.http
      .post(
        `${environment.SERVER_URL}/ProductDetail/get-product-by-categoryName-linq`,
        x
      )
      .subscribe(
        (result) => {
          this.flag = "2";
          this.products = result;
          this.products = this.products.data;
        },
        (error) => console.error(error)
      );
  }

  // Lấy số lượng sản phẩm
  getProductQuantity(id) {
    var x = {
      categoryId: id
    }
    this.http.post(`${environment.SERVER_URL}/ProductDetail/get-product-by-categoryName-no-pagination`, x)
      .subscribe(result => {
        this.productQuantity = result;
        this.productQuantity= this.productQuantity.data;
      }, error => console.error(error));
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

  // Lấy sản phẩm theo tên loại sản phẩm
  getProductByCcategoryName(cPage, id) {
    let x = {
      productId: id,
      page: cPage,
      size: 12
    }
    this.http.post(`${environment.SERVER_URL}/Product/get-product-detail-by-product-id`, x).subscribe(result => {
      this.flag = "1";
      this.productId = id;
      this.products = result;
      this.products = this.products.data;
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
