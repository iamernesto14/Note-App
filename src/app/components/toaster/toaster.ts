
   import { Component, OnInit, OnDestroy } from '@angular/core';
   import { ToasterService, Toast } from '../../services/toaster';
   import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-toaster',
      imports: [ CommonModule],
     standalone: true,
     templateUrl: './toaster.html',
     styleUrls: ['./toaster.scss']
   })
   export class Toaster implements OnInit, OnDestroy {
     toast: Toast | null = null;
     private subscription!: Subscription;

     constructor(private toasterService: ToasterService) {}

     ngOnInit() {
       this.subscription = this.toasterService.toastState.subscribe(toast => {
         this.toast = toast;
         if (toast) {
           setTimeout(() => this.toasterService.clearToast(), toast.duration);
         }
       });
     }

     ngOnDestroy() {
       this.subscription.unsubscribe();
     }

     closeToast() {
       this.toasterService.clearToast();
     }
   }
