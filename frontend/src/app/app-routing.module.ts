import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntriesListComponent} from './components/entries-list/entries-list.component';
import {EntryComponent} from './components/entry/entry.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {LogoutComponent} from './components/logout/logout.component';
import {UnAuthGuard} from './guards/un-auth.guard';

const routes: Routes = [
  {path: '', component: EntriesListComponent, canActivate: [AuthGuard]},
  {path: 'entry', component: EntryComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  // {path: 'profile', component: , canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UnAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
