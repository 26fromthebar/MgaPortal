import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
