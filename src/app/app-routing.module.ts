import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubesViewComponent } from './pages/clubes-view/clubes-view.component';
import { ClubViewComponent } from './pages/club-view/club-view.component';

const routes: Routes = [
  { path: '', component: ClubesViewComponent },
  { path: ':id', component: ClubViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

