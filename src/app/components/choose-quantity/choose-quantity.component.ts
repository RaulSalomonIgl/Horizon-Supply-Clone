import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-choose-quantity',
  standalone: true,
  imports: [],
  templateUrl: './choose-quantity.component.html',
  styleUrl: './choose-quantity.component.css',
})
export class ChooseQuantityComponent {
  @Output() changeCountEvent = new EventEmitter<number>();

  quantity: number = 1;

  handleQuantityChange(action: 'increase' | 'decrease'): void {
    if (action === 'increase') {
      this.quantity += 1;
    } else if (action === 'decrease' && this.quantity > 1) {
      this.quantity -= 1;
    }
    this.changeQuantity();
  }

  changeQuantity() {
    this.changeCountEvent.emit(this.quantity);
  }
}
