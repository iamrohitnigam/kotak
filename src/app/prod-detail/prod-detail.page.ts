import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../_service/alert.service';
import { CartService } from '../_service/cart.service';

import { Location } from "@angular/common";
import { AppSetting } from '../_shared/config/app-setting';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.page.html',
  styleUrls: ['./prod-detail.page.scss'],
})
export class ProdDetailPage implements OnInit, AfterViewInit {


  product: any = {};
  currentSeg: any = 1;
  cartItems: any = [];

  trustedVideoUrl: SafeResourceUrl;
  @ViewChild('iframe') iframe: ElementRef;

  constructor(
    private route: Router,
    public alertServ: AlertService,
    private location: Location,
    private domSanitizer: DomSanitizer,
    public elementRef: ElementRef,
    public cartServ: CartService) { }

  ngOnInit() {
    this.cartServ.getProds().then(data => {
      this.cartItems = data['ids'];
    });
    this.cartServ.getCurrItem().then(data => {
      this.product = data;
      console.log(this.product);

      if (this.product == undefined) {
        this.route.navigate(['/']);
      }
      // this.iframe.nativeElement.setAttribute('src', this.domSanitizer.bypassSecurityTrustResourceUrl(this.product.video.trim()));
      var d1 = this.elementRef.nativeElement.querySelector('.iframeElm');
      d1.insertAdjacentHTML('beforeend', '<iframe width="100%" height="315" src=' + this.product.video.trim() + ' frameborder="0" allowfullscreen></iframe>');
    });
  }

  ngAfterViewInit() {

  }


  add() {
    this.cartServ.addProd(this.product).then(data => {
      this.alertServ.openSnackBar("Added to cart");
      this.location.back();
    });
  }

  getUrl(img) {
    return AppSetting + "/" + img.image;
  }

  buy() {
    this.cartServ.addProd(this.product).then(data => {
      // this.alertServ.openSnackBar("Added to cart");
      this.route.navigate(['cart']);
    });
  }
}
