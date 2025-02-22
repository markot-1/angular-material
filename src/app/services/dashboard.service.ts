import { Injectable, signal } from '@angular/core';
import { Widget } from '../configs/dashboard';
import { SubscribersComponent } from '../components/pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../components/pages/dashboard/widgets/views/views.component';

@Injectable()
export class DashboardService {

  constructor() { }

  widgets = signal<Widget[]>([{
    id: 1,
    label: 'Subscribers',
    content: SubscribersComponent,
  },
  {
    id: 2,
    label: 'Views',
    content: ViewsComponent,
  }
]);
}
