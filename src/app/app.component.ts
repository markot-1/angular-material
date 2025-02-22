import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, DashboardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-material';
}
