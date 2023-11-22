import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocialShareService {
  constructor() {}

  shareOnFacebook(url: string): void {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    this.openShareWindow(facebookShareUrl);
  }

  shareOnTwitter(url: string, text: string): void {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    this.openShareWindow(twitterShareUrl);
  }

  shareOnLinkedIn(url: string, title: string, summary: string): void {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      summary
    )}`;
    this.openShareWindow(linkedInShareUrl);
  }

  private openShareWindow(url: string): void {
    window.open(url, '_blank', 'width=800,height=600');
  }
}
