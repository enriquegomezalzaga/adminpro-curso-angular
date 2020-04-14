import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/service.index';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: PagenotfoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
