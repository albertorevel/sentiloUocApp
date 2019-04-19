import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeasurementViewPage } from './measurement-view.page';

const routes: Routes = [
  {
    path: '',
    component: MeasurementViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeasurementViewPage]
})
export class MeasurementViewPageModule {}
