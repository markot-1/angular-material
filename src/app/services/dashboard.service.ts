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
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 2,
      label: 'Views',
      rows: 1,
      columns: 1,
      content: ViewsComponent,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
  ]);

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 2,
      label: 'Views',
      rows: 1,
      columns: 1,
      content: ViewsComponent,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
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

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex(widget => widget.id === id);

    if(index === this.addedWidgets().length -1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()]; 
    [newWidgets[index], newWidgets[index+1]] = [{...newWidgets[index+1]}, {...newWidgets[index]}];
    this.addedWidgets.set(newWidgets);
  }

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex(widget => widget.id === id);

    if(index === 0) {
      return;
    }

    const newWidgets = [...this.addedWidgets()]; 
    [newWidgets[index], newWidgets[index-1]] = [{...newWidgets[index-1]}, {...newWidgets[index]}];
    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter(widget => widget.id !== id));
  }
}
