import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  isFullscreen: boolean = false;
  isSharing: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
