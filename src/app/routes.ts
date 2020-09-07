import { Routes } from '@angular/router';
import { SectionHomeComponent } from '../app/sections/section-home/section-home.component';
import { SectionAreasComponent } from './sections/section-areas/section-areas.component';
import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { SectionProductsComponent } from './sections/section-products/section-products.component';
import { SectionLoginComponent } from './sections/section-login/section-login.component';
import { AuthGuard } from './helpers/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: SectionHomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: SectionHomeComponent },
  { path: 'areas', component: SectionAreasComponent },
  { path: 'sales', component: SectionSalesComponent },
  { path: 'products', component: SectionProductsComponent },
  { path: 'login', component: SectionLoginComponent }
];
