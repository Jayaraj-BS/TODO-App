import { Component } from '@angular/core';
import { ToastService } from '../settings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toastMessage: string | null = null;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toast$.subscribe((message: string | null) => {
      this.toastMessage = message;
    });
  }

}
