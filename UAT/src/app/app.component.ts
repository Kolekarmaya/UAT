import {Component, ViewChild} from '@angular/core';
import {
  CdkDragDrop, moveItemInArray
} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sentinel';
  todo = [
    'Input',
    'Textarea',
    'Select',
    'Checkbox',
    'Button'
  ];

}
