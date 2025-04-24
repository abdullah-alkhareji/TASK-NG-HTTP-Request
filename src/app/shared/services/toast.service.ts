import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export interface ToastConfig {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast = signal<ToastConfig | null>(null);
  toast$ = toObservable(this.toast);

  constructor() {}

  showToast(config: ToastConfig) {
    this.toast.set(config);
    setTimeout(() => {
      this.toast.set(null);
    }, 3000);
  }

  success(message: string) {
    this.showToast({ message, type: 'success', isVisible: true });
  }

  error(message: string) {
    this.showToast({ message, type: 'error', isVisible: true });
  }
}
