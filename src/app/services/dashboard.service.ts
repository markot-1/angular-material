import { computed, Injectable, signal } from '@angular/core';
import { Widget } from '../configs/dashboard';
import { SubscribersComponent } from '../components/pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../components/pages/dashboard/widgets/views/views.component';

@Injectable()
export class DashboardService {
  constructor() {}

  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
    },
  ]);

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 2,
      columns: 2
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
    },
  ]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(widget => widget.id);
    return this.widgets().filter(widget => !addedIds.includes(widget.id));
  })

  addWidget(widget: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), {...widget}])
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex(widget => widget.id === id);
    if(index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = {...newWidgets[index], ...widget};
      this.addedWidgets.set(newWidgets);
    }
  }
}
