import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-quantity',
  standalone: true,
  imports: [],
  templateUrl: './choose-quantity.component.html',
  styleUrl: './choose-quantity.component.css',
})
export class ChooseQuantityComponent {
  quantity: number = 1;

  handleQuantityChange(action: 'increase' | 'decrease'): void {
    if (action === 'increase') {
      this.quantity += 1;
    } else if (action === 'decrease' && this.quantity > 1) {
      this.quantity -= 1;
    }
  }
}
