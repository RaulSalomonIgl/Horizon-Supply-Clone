import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
})
export class ActionButtonsComponent {
  isButtonDisabled: boolean = true;
}
