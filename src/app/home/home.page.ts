import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../_service/alert.service';
import { CartService } from '../_service/cart.service';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  loading: string;
  fromSellPage: boolean = false;
  cartItems: any = [];
  filter: string = "0";
  products: any = [];


  constructor(public navCtrl: NavController,
    private alertServ: AlertService,
    private route: Router,
    public cartServ: CartService,
    private prodServ: ProductService
  ) {
    this.getProducts();
  }

  ngOnInit() {
    this.cartServ.getProds().then(data => {
      this.cartItems = data['ids'];
    })
  }

  getProducts() {
    this.alertServ.loadingPresent();

    this.prodServ.getProducts()
      .pipe(
        finalize(async () => {
          await this.alertServ.loadingDismiss();
          this.loading = 'done';
        }))
      .subscribe(
        data => {
          this.products = data;
          this.loading = 'done';
        },
        error => {
          this.alertServ.openSnackBar(error.error.message);
        });
  }

  openDetail(item) {
    this.cartServ.setCurrItem(item).then(data => {
      this.route.navigate(['prod-detail', { id: item.id }]);
    });
  }

  add(prod) {
    this.cartServ.addProd(prod).then(data => {
      this.alertServ.openSnackBar("Added to cart");
    });
  }

}
