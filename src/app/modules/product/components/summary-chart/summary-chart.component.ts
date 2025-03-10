import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-summary-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-chart.component.html',
  styleUrl: './summary-chart.component.css',
})
export class SummaryChartComponent {
  reviewStats = [
    { stars: 5, percentage: 63 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 12 },
    { stars: 1, percentage: 9 },
  ];
}
