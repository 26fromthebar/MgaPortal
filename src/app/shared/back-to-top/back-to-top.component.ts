import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
})
export class BackToTopComponent implements OnInit {
  showScroll: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show the button when the user scrolls down
    this.showScroll = window.scrollY > 500;
  }

  scrollToTop() {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
