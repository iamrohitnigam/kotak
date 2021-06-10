import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  prodIds: any[] = [];
  prods: any[] = [];
  constructor() { }
  currItem: any;

  addProd(prod) {
    return new Promise((resolve, reject) => {
      if (!this.prodIds.includes(prod.id)) {
        this.prodIds.push(prod.id);
        this.prods.push(prod);
        console.log(this.prodIds);
        console.log(this.prods);
        
      }
      resolve(true);
    });
  }

  removeProd(item) {
    console.log(item);
    
    return new Promise((resolve, reject) => {
      this.prods.forEach(function (prod, index, object) {
        if (prod.id === item.id) {
          object.splice(index, 1);
        }
      });
      var index = this.prodIds.indexOf(item.id);
      this.prodIds.splice(index, 1);
      resolve({ ids: this.prodIds, prods: this.prods });
    });
  }

  getProds() {
    return new Promise((resolve, reject) => {
      resolve({ ids: this.prodIds, prods: this.prods });
    });
  }

  empty() {
    return new Promise((resolve, reject) => {
      this.prodIds = [];
      this.prods = [];
      resolve(true);
    });
  }

  setCurrItem(item) {
    return new Promise((resolve, reject) => {
      this.currItem = item;
      resolve(true);
    });
  }

  getCurrItem() {
    return new Promise((resolve, reject) => {
      resolve(this.currItem);
    });
  }
}
