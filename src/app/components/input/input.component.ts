import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() inputType: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = 'Placeholder';
  @Output() valueEvent = new EventEmitter<any>();

  value: string = ''; // Valor interno del input
  onChange: any = () => {}; // Función para notificar cambios
  onTouched: any = () => {}; // Función para notificar que el control fue tocado

  // Método para escribir el valor desde el formulario al componente
  writeValue(value: any): void {
    this.value = value || '';
  }

  // Método para registrar la función de cambio
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Método para registrar la función de "touched"
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
    this.valueEvent.emit(newValue);
  }
}
