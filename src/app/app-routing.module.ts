import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ItemComponent } from './components/item/item.component';
import { ApplicationSingleComponent } from './components/application-single/application-single.component';
import { GamesComponent } from './components/games/games.component';

const routes: Routes = [
  { path: 'collections', component: CollectionsComponent },
  { path: 'collections/:uuid', component: ItemComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'applications/web-app', component: ApplicationSingleComponent },
  { path: 'applications/v-art', component: ApplicationSingleComponent },
  { path: 'applications/games', component: GamesComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'collections', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
