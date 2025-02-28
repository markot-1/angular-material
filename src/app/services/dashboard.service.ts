import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../configs/dashboard';
import { SubscribersComponent } from '../components/pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../components/pages/dashboard/widgets/views/views.component';
import { WatchTimeComponent } from '../components/pages/dashboard/widgets/watch-time/watch-time.component';
import { RevenueComponent } from '../components/pages/dashboard/widgets/revenue/revenue.component';
import { AnalyticsComponent } from '../components/pages/dashboard/widgets/analytics/analytics.component';

@Injectable()
export class DashboardService {
  constructor() {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.fetchWidgets();
    }
  }

  widgets = signal<Widget[]>([
    {
      id: Math.random(),
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: Math.random(),
      label: 'Views',
      rows: 1,
      columns: 1,
      content: ViewsComponent,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: Math.random(),
      label: 'Watch Time',
      rows: 1,
      columns: 1,
      content: WatchTimeComponent,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: Math.random(),
      label: 'Revenue',
      rows: 1,
      columns: 1,
      content: RevenueComponent,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: Math.random(),
      label: 'Analytics',
      rows: 2,
      columns: 2,
      content: AnalyticsComponent,
    },
  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(widget => widget.id);
    return this.widgets().filter(widget => !addedIds.includes(widget.id));
  })

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if(widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id === widget.id)?.content;
        if(content) {
          widget.content = content;
        }
      });

      this.addedWidgets.set(widgets);
    }
  }

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

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(widget => ({...widget}));
    widgetsWithoutContent.forEach(widget => {
      delete widget.content;
    })

    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent));
  })
}
