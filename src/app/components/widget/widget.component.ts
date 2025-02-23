import { Component, input } from '@angular/core';
import { Widget } from '../../configs/dashboard';
import { MatButtonModule } from '@angular/material/button'; 
import { MatRippleModule } from '@angular/material/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-widget',
  imports: [MatButtonModule, MatRippleModule, NgComponentOutlet],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {
  data = input.required<Widget>();
}
