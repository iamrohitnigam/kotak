import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../_shared/config/app-setting';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(AppSetting.API_ENDPOINT)
      .pipe(map(data => {
        console.log(data)
        return data;
      }));
  }
}
