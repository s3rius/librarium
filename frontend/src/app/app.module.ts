import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EntryComponent} from './components/entry/entry.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EntriesListComponent} from './components/entries-list/entries-list.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {FormsModule} from '@angular/forms';
import {LogoutComponent} from './components/logout/logout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatGridListModule, MatProgressSpinnerModule} from '@angular/material';
import {Globals} from './globals';
import {SecurePipe} from './pipes/secure.pipe';
import {AuthInterceptor} from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntriesListComponent,
    LoginComponent,
    LogoutComponent,
    SecurePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [AuthService, Globals, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
