   import { Injectable } from '@angular/core';
   import { Subject } from 'rxjs';

   export interface Toast {
     message: string;
     type: 'success' | 'info' | 'error';
     duration?: number;
   }

   @Injectable({
     providedIn: 'root'
   })
   export class ToasterService {
     private toastSubject = new Subject<Toast | null>();
     toastState = this.toastSubject.asObservable();

     showToast(message: string, type: 'success' | 'info' | 'error', duration: number = 3000) {
       this.toastSubject.next({ message, type, duration });
     }

     clearToast() {
       this.toastSubject.next(null);
     }
   }
