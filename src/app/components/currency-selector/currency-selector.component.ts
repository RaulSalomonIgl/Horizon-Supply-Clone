import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.css',
})
export class CurrencySelectorComponent {
  _isDropdownOpen: boolean = false;

  toggleDropdown() {
    this._isDropdownOpen = !this._isDropdownOpen;
  }
}
