import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {UserEditComponent} from './components/user-edit.component';

// al declarar estos componentes acá, permite que cualquier acceder a sus directivas dentro que cualquier componentes dentro de sus directivas
@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
