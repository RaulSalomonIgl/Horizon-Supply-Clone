import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StarRatingComponent } from '../../../../components/star-rating/star-rating.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  reviews: any[] = [
    {
      id: 1,
      name: 'Emily Selman',
      date: 'July 16, 2024',
      rating: 5,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      avatar: 'assets/images/user-placeholder.webp',
    },
    {
      id: 2,
      name: 'Héctor Gibbons',
      date: 'July 12, 2024',
      rating: 5,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      avatar: 'assets/images/user-placeholder.webp',
    },
    {
      id: 3,
      name: 'Mark Edwards',
      date: 'July 6, 2024',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      avatar: 'assets/images/user-placeholder.webp',
    },
  ];
}
