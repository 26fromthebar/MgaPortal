import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ItemComponent } from './components/item/item.component';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { AppCardComponent } from './shared/app-card/app-card.component';
import { CollectionCardComponent } from './shared/collection-card/collection-card.component';
import { ImageSliderComponent } from './shared/image-slider/image-slider.component';
import { ApplicationSingleComponent } from './components/application-single/application-single.component';
import { GamesComponent } from './components/games/games.component';
import { GameCardComponent } from './shared/game-card/game-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ApplicationsComponent,
    CollectionsComponent,
    PageNotFoundComponent,
    BackToTopComponent,
    FooterComponent,
    HeaderComponent,
    PaginationComponent,
    ItemComponent,
    BackButtonComponent,
    AppCardComponent,
    CollectionCardComponent,
    ImageSliderComponent,
    ApplicationSingleComponent,
    GamesComponent,
    GameCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
