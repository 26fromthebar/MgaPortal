import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input() urlLink: string[] = [];
  @Input() imgUrl: string = '';
  @Input() title: string = '';
  @Input() creator: string = '';

  constructor() {}

  ngOnInit(): void {}
}
