import { Component } from '@angular/core';
import { WidgetComponent } from "../../components/widget/widget.component";
import { Widget } from '../../configs/dashboard';
import { SubscribersComponent } from './widgets/subscribers/subscribers.component';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  data: Widget = {
    id: 1,
    label: 'Subscribers',
    content: SubscribersComponent,
  }
}
