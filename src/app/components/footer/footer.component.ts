import { Component } from '@angular/core';
import { SvgIconComponent } from '../../icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
