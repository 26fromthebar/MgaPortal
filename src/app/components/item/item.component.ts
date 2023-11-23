import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SocialShareService } from 'src/app/services/social-share.service';
import { IDataStream } from 'src/app/types/idata-stream';
import { IDetailedItem } from 'src/app/types/idetailed-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item!: IDetailedItem;
  itemFiles: IDataStream[] = [];
  isFullscreen: boolean = false;
  isSharing: boolean = false;
  private shareUrl = 'https://your-website-url.com';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private socialShareService: SocialShareService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('uuid');

    if (id) {
      this.fetchContainer(id);
      this.fetchDataStreams(id);
    }
  }

  fetchContainer(id: string) {
    this.dataService.getContainer(id).subscribe({
      next: (res) => {
        console.log(res);

        const itemWithDetails: IDetailedItem = {
          id: res.properties?.find(
            (prop) =>
              prop.schemaPropertyUuid === '76e69305-1c62-40e9-9e80-7dda897c1689'
          )?.value,
          title:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                'b26d5f89-d42f-4400-8abd-031746597fca'
            )?.valueAsText ?? '',
          creator:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '4c7953e0-47e5-4a28-b55f-7f7808c32553'
            )?.valueAsText ?? '',
          date:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                'fce195b9-7a32-4de1-996f-062f36ecbaca'
            )?.valueAsText ?? '',
          type:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '1d813c78-d2d8-40f3-8a19-5ac777453c4b'
            )?.valueAsText ?? '',
          description:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '2cf30d2e-bf48-4db1-b278-ba3cd57f51ae'
            )?.valueAsText ?? '',
          material:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '59da0ca3-1356-4124-9cf3-f56cd0b14c9e'
            )?.valueAsText ?? '',
          dimensions:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '8c7b297a-7af7-4b16-b7c5-331daabe67c9'
            )?.valueAsText ?? '',
          copyright:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '5bf9b20d-d193-4347-b5c4-a86004f743d5'
            )?.valueAsText ?? '',
          source:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                'e7f1a3a7-c6cf-4fbd-a596-c1d688b0173a'
            )?.valueAsText ?? '',
          onlineAt:
            res.properties?.find(
              (prop) =>
                prop.schemaPropertyUuid ===
                '76e69305-1c62-40e9-9e80-7dda897c1689'
            )?.valueAsText ?? '',
          uuid: res.uuid,
          imageSrc: res.coverFile?.viewUrl
            ? res.coverFile?.viewUrl
            : '/assets/images/default-image.jpg',
          imageAlt: res.coverFile?.filename
            ? res.coverFile?.filename
            : 'Default image',
        };

        this.item = itemWithDetails;
      },
    });
  }

  fetchDataStreams(id: string) {
    this.dataService.getDataStreams(id).subscribe({
      next: (res) => {
        console.log(res);
        this.itemFiles = res.content;
      },
    });
  }

  onClickFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  onClickSocialShare() {
    this.isSharing = !this.isSharing;
  }

  shareOnFacebook(): void {
    this.socialShareService.shareOnFacebook(this.shareUrl);
  }

  shareOnTwitter(): void {
    this.socialShareService.shareOnTwitter(
      this.shareUrl,
      'Μουσείο Νεοελληνικής Τέχνης Ρόδου'
    );
  }

  shareOnLinkedIn(): void {
    // Adjust title and summary as needed
    const title = 'Μουσείο Νεοελληνικής Τέχνης Ρόδου';
    this.socialShareService.shareOnLinkedIn(this.shareUrl, title, '');
  }
}
