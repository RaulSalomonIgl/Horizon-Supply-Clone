import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() inputType: string = '';
  @Input() label?: string = '';
  @Input() placeholder?: string = '';
}
