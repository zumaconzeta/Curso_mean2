import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import {HomeComponent} from './components/home.component';
import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';

// al declarar estos componentes acá,
// permite que cualquier acceder a sus directivas dentro que cualquier componentes dentro de sus directivas
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
