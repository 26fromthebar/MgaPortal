import { Component, OnInit, Input } from '@angular/core';
import { IStreamFile } from 'src/app/types/istream-file';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit {
  @Input() slides: IStreamFile[] = [];
  currentIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  nextSlide(): void {
    if (this.currentIndex < this.slides.length - 1) this.currentIndex++;
    console.log(this.currentIndex);
  }

  previousSlide(): void {
    if (this.currentIndex > 0) this.currentIndex--;
    console.log(this.currentIndex);
  }
}
