import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goToMainHome() {
    this.router.navigate(['/mainhome']);
  }
}
