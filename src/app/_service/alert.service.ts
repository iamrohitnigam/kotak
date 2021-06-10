import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isLoading: any;

  constructor(public loadingController: LoadingController, public toastController: ToastController) { }

  // async presentLoading() {
  //   // Prepare a loading controller
  //   this.loading = await this.loadingController.create({
  //     message: 'Loading...'
  //   });
  //   // Present the loading controller
  //   await this.loading.present();
  // }

  // async loadingDismiss() {
  //   setTimeout(() => {
  //       return this.loadingController.dismiss();
  //   }, 1000);
  // }

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Loading...'
    }).then(a => {
      a.present().then(() => {
        // console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }


  async openSnackBar(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
