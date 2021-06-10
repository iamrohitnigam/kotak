import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../_service/alert.service';
import { CartService } from '../_service/cart.service';

import { Location } from "@angular/common";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  prods: any = [];
  cartItems: any = [];
  cartEmpty:boolean = false;

  ngOnInit() {
    this.cartServ.getProds().then(data => {
      console.log(data);
      this.cartItems = data['ids'];
      this.prods = data['prods'];
      if(this.cartItems.length == 0)
      {
        this.cartEmpty = true;
      }
    })
  }

  constructor(
    public cartServ: CartService,
    private alertServ: AlertService,
    public _location: Location,
        private route: Router,

  ) { }

  get finalValue(): number {
    return 0 
  }

  sell() {
    this.route.navigate(['cart-sell']);
  }

  removeItem(item)
  {
    this.cartServ.removeProd(item).then(data => {
      console.log(data);
      this.cartItems = data['ids'];
      this.prods = data['prods'];
      if(this.cartItems.length == 0)
      {
        this._location.back();
        this.alertServ.openSnackBar("Cart empty, add products.");
      }
    });
  }

  getFinalValue() {
    let tp = 0;
    this.prods.forEach(pro => {
      tp += +pro.price;
    });
    return tp;
  }


}
