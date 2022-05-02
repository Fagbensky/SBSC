import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotLoggedInGuard } from './core/guards/not-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'home',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'account',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'users',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'location',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
