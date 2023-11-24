import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss'],
})
export class AppCardComponent implements OnInit {
  @Input() imgSrc: string = '/assets/images/default.jpg';
  @Input() title: string = 'Default title';
  @Input() linkUrl: string[] = ['/'];
  @Input() linkText: string = 'Δείτε';
  constructor() {}

  ngOnInit(): void {}
}
