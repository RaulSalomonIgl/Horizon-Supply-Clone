import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
})
export class ActionButtonsComponent {
  @Input() isButtonDisabled: boolean = true;
}
