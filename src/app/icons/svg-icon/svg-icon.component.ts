import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  template: `<div [innerHTML]="svgContent"></div>`,
})
export class SvgIconComponent {
  @Input() iconName!: string; // Nombre del archivo SVG
  svgContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadSvg();
  }

  private loadSvg() {
    fetch(`/assets/icons/${this.iconName}.svg`)
      .then((response) => response.text())
      .then((svg) => {
        // Marca el SVG como seguro para su renderización
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
      })
      .catch((error) => {
        console.error('Error loading SVG:', error);
      });
  }
}
