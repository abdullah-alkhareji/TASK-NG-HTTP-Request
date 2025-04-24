import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toast$ = this.toastService.toast$;
}
