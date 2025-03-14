import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../core/entities/country.entity';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
})
export class SelectInputComponent {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Output() selectedEvent = new EventEmitter<any>();

  onSelected(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedEvent.emit(value);
  }
}
