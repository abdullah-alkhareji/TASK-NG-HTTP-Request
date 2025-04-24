import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private router: Router) {}
  @Input() message = 'The page you are looking for does not exist.';
  @Input() path = '/';

  goBack() {
    this.router.navigate([this.path]);
  }
}
