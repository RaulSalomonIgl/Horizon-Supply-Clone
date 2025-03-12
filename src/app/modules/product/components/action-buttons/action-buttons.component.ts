import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
})
export class ActionButtonsComponent {
  @Input() isButtonDisabled: boolean = true;
  @Output() onClickButton = new EventEmitter<string>();

  onClick(action: 'buy' | 'addToCart' | 'addToWishlist') {
    this.onClickButton.emit(action);
  }
}
