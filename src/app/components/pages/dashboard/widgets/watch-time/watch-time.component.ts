import { Component } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-watch-time',
  providers: [provideNativeDateAdapter()],
  imports: [MatIcon],
  templateUrl: './watch-time.component.html',
  styleUrl: './watch-time.component.scss'
})
export class WatchTimeComponent {
}
