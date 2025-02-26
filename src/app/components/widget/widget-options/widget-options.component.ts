import { Component, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { Widget } from '../../../configs/dashboard';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-widget-options',
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.scss'
})
export class WidgetOptionsComponent {
  data = input.required<Widget>();
  showOptions = model<boolean>(false);
  store = inject(DashboardService);
}
