import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  title: string = 'Ψηφιακά Μουσειοπαιχνίδια';
  shortDescription: string = 'This is a really short description';
  heroImgUrl: string = '/assets/images/app-2.png';
  sectionTitle: string = 'Default Section title';
  sectionSubtitle: string = 'Default Section Subtitle';
  sectionDetails: string =
    'Luctus accumsan tortor posuere ac ut. Cras tincidunt lobortis feugiat vivamus at augue. Dolor sit amet consectetur adipiscing elit. Sed faucibus turpis in eu mi bibendum.';

  imgSrc: string = '/assets/images/app-1.png';

  games = [
    {
      title: 'Τίτλος παιχνιδιού 1',
      imgUrl: '/assets/images/app-1.png',
      linkUrl: '/',
      linkText: 'Παίξε',
    },
    {
      title: 'Τίτλος παιχνιδιού 2',
      imgUrl: '/assets/images/app-2.png',
      linkUrl: '/',
      linkText: 'Παίξε',
    },
    {
      title: 'Τίτλος παιχνιδιού 3',
      imgUrl: '/assets/images/img-3.png',
      linkUrl: '/',
      linkText: 'Παίξε',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
