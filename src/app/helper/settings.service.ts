import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<string | null>(null);

  toast$ = this.toastSubject.asObservable();

  showToast(message: string) {
    this.toastSubject.next(message);
    setTimeout(() => this.toastSubject.next(null), 3000); // Auto-hide after 3 seconds
  }
}
