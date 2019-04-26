import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'component-list', loadChildren: './pages/components/component-list/component-list.module#ComponentListPageModule' },
  { path: 'component-view/:component-id/:modify', loadChildren: './pages/components/component-view/component-view.module#ComponentViewPageModule' },
  { path: 'sensor-list', loadChildren: './pages/sensors/sensor-list/sensor-list.module#SensorListPageModule' },
  { path: 'sensor-view', loadChildren: './pages/sensors/sensor-view/sensor-view.module#SensorViewPageModule' },
  { path: 'measurement-view/:measurement-id/:modify', loadChildren: './pages/sensors/measurement-view/measurement-view.module#MeasurementViewPageModule' },
  { path: 'change-password', loadChildren: './pages/user/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'log-out', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
