import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EntryComponent} from './components/entry/entry.component';
import {HttpClientModule} from '@angular/common/http';
import {EntriesListComponent} from './components/entries-list/entries-list.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {FormsModule} from '@angular/forms';
import {LogoutComponent} from './components/logout/logout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntriesListComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
