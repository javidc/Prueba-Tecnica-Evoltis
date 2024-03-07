import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClubesViewComponent } from './pages/clubes-view/clubes-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PrimengModule } from './primeng/primeng.module';
import { ClubViewComponent } from './pages/club-view/club-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubesViewComponent,
    ClubViewComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([]),  
    HttpClientModule,
    PrimengModule,
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


