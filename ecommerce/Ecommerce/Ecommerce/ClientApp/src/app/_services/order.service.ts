import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }
    CreateOrder(Order) {
        return this.http.post(`${environment.SERVER_URL}/Order/Create-Order`, Order);
    }

    GetOrder(userId) {
        return this.http.get(`${environment.SERVER_URL}/Order/Show-Order/` + userId);
    }

    CreateOrderDetail(OrderDetail) {
        return this.http.post(`${environment.SERVER_URL}/Ordetail/Create-OrderDetail`, OrderDetail);
    }

}
