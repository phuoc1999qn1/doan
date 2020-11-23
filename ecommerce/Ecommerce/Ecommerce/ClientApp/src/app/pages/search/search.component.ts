import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keywords: string;
  productQty: number;

  // Chứa sản phẩm tìm kiếm không phân trang
  proNoPage: any = {
    data: []
  };

  // Chứa sản phẩm tìm kiếm phân trang
  products: any = {
    data: [],
    totalRecord: 0,
    page: 0,
    totalPages: 0,
  };

  constructor(private http: HttpClient,
    private router: Router,
    private activate: ActivatedRoute) { }

  ngOnInit() {
    // search
    this.activate.paramMap.subscribe((params) => {
      this.keywords = params.get("keywords");
    })

    this.searchProduct(this.keywords.trim().replace(/\s+/g, " "));
    this.searchProductNoPagination(this.keywords)
  }

  searchProduct(keyname) {
    let x = {
      page: 1,
      size: 12,
      keyword: keyname
    }

    this.http.post(`${environment.SERVER_URL}/Product/search-product`, x).subscribe(result => {
      this.products = result;
      this.products = this.products.data;
    })
  }

  searchProductNoPagination(keyname) {
    let x = {
      keyword: keyname
    }

    this.http.post(`${environment.SERVER_URL}/Product/search-all-product-non-pagination`, x).subscribe(result => {
      this.proNoPage = result;
      this.productQty = this.proNoPage.data.length;
    })
  }

  // flag = 1 => Phân trang tất cả sản phẩm
  // flag = 2 => Phân trang sản phẩm theo tên loại sản phẩm
  searchNext() {
    if (this.products.page < this.products.totalPages) {
      let nextPage = this.products.page + 1;
      let x = {
        page: nextPage,
        size: 12,
        keyword: this.keywords,
      };
      this.http
        .post(`${environment.SERVER_URL}/Product/search-product`, x)
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

  searchPrevious() {
    if (this.products.page > 1) {
      let previousPage = this.products.page - 1;
      let x = {
        page: previousPage,
        size: 12,
        keyword: this.keywords,
      };
      this.http
        .post(`${environment.SERVER_URL}/Product/search-product`, x)
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
