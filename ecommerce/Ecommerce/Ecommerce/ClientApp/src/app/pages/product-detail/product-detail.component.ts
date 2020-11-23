import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";

declare var $;

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public proName: any;
  public listProduct: [];

  productId: any = [];
  relatedProduct: any = {};

  products: any = {
    data: [],
  };

  // chua data proDetail
  tempPro: any = {
    data: [],
  };

  //tao du lieu trung gian
  testdata: any = [];

  proQuanity = 1;

  constructor(
    private activate: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    let proDetailsId;

    this.activate.paramMap.subscribe((params) => {
      proDetailsId = params.get("id");
    });

    
    setTimeout(this.relatedSlick, 1000);
    this.getProDetail(proDetailsId);
    this.getProductId(parseInt(proDetailsId))
  }

  getProDetail(id) {
    return this.http
      .post(`${environment.SERVER_URL}/ProductDetail/get-by-id/` + id, id)
      .subscribe(
        (result) => {
          this.products = result;
          this.products = this.products.data;
          this.tempPro = this.products;
          this.getRelatedProduct(this.products.categoryId, this.products.productId, 1);
        },
        (error) => console.error(error)
      );
  }

  // Lấy ProductId bằng ProductDetailId
  getProductId(id) {
    var x = {
      proDetailsId: id
    }

    this.http.post(`${environment.SERVER_URL}/ProductDetail/get-product-id-by-product-detail-id`, x)
      .subscribe(result => {
        this.productId = result;
        this.getProductNameByProId(this.productId.data[0].productId);
      }, error => console.error(error));
  }

  // Lấy tên phân loại sản phẩm vd: Điện thoại smartphone, điện thoại bàn,...
  getProductNameByProId(id) {
    var x = {
      productId: id
    }
    this.http.post(`${environment.SERVER_URL}/Product/get-productName-by-productId`, x)
      .subscribe(result => {
        this.proName = result;
        this.listProduct = this.proName.data;
      }, error => console.error(error));
  }

  getRelatedProduct(cateId, proId, cPage) {
    let x = {
      categoryId: cateId,
      productId: proId,
      page: cPage,
      size: 12
    }

    this.http.post(`${environment.SERVER_URL}/Categories/get-product-detail-by-category-id`, x)
      .subscribe(result => {
        this.relatedProduct = result;
        this.relatedProduct = this.relatedProduct.data;
        console.log(this.relatedProduct)
      })
  }

  relatedSlick() {
    $(".slider-list").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 3,
      prevArrow: ".prev",
      nextArrow: ".next",
    });
  }

  //luu local storage
  addToCart() {
    window.alert("Đặt hàng thành công.");
    if (localStorage.getItem("cart") === null) {
      this.testdata.push({
        id: this.tempPro.proDetailsId,
        name: this.tempPro.proName,
        qty: this.proQuanity,
        price: this.tempPro.price,
        img: this.tempPro.image,
      });
      localStorage.setItem("cart", JSON.stringify(this.testdata));
    } else {
      this.testdata = JSON.parse(localStorage.getItem("cart"));
      if (this.testdata.length > 10)
        window.alert("Đặt hàng không thành công. Giỏ hàng full!");
      else {
        let check = 0;
        for (let i in this.testdata)
          if (this.testdata[i].id === this.tempPro.proDetailsId) {
            this.proQuanity += this.testdata[i].qty;
            this.testdata[i] = {
              id: this.tempPro.proDetailsId,
              name: this.tempPro.proName,
              qty: this.proQuanity,
              price: this.tempPro.price,
              img: this.tempPro.image,
            };
            check = 1;
          }
        if (check == 0) {
          this.testdata.push({
            id: this.tempPro.proDetailsId,
            name: this.tempPro.proName,
            qty: this.proQuanity,
            price: this.tempPro.price,
            img: this.tempPro.image,
          });
        }
        localStorage.setItem("cart", JSON.stringify(this.testdata));
      }
    }
    this.proQuanity = 1;
    window.location.reload();
  }
}
