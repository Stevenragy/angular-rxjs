import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';

// handling mouse event using rxjs
// const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');

// const lastMouseMovement = mouseMove$.pipe(throttleTime(1000));

// lastMouseMovement.subscribe((event) => {
//   console.log(`Mouse Position: X: ${event.clientX}, Y: ${event.clientY}`);
// });

@Component({
  selector: 'pm-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pageTitle = 'Acme Product';
}
