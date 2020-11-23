import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    GetUser() {
        return this.http.get<User[]>(`${environment.SERVER_URL}/Users`);
    }

    CreateUser(user) {
        return this.http.post(`${environment.SERVER_URL}/Users/create-user`, user);
    }

    GetHash(email) {
        return this.http.post(`${environment.SERVER_URL}/Users/get-hash-pw`, {email});
    }


    UpdateAddress(user) {
        return this.http.post(`${environment.SERVER_URL}/Users/update-address`, user);
    }

    UpdatePassword(user) {
        return this.http.post(`${environment.SERVER_URL}/Users/update-password`, user);
    }

    UpdateUser(user) {
        return this.http.post(`${environment.SERVER_URL}/Users/update-user`, user);
    }
}
