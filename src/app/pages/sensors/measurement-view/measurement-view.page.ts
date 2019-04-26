import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Measurement } from 'src/app/model/sentilo/measurement';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.page.html',
  styleUrls: ['./measurement-view.page.scss'],
})
export class MeasurementViewPage implements OnInit {

  measurement:Measurement
  modify:boolean
  // nameInput:FormControl
  // dataInput:FormControl

  constructor(
    public toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private modelService: ModelService
    ) { }

  ngOnInit() {

    // We read parameters and prepare data

    this.modify = this.route.snapshot.paramMap.get('modify') === "true";
    var id = parseInt(this.route.snapshot.paramMap.get('measurement-id'), 10);

    if (typeof id !== "undefined" && id != null && id > 0) {
      this.measurement = this.modelService.getMeasurement(id);
    }
    else {
      id = null
      this.measurement = new Measurement();
      this.modify = true;
    }
  }

  async submit() {

    const toast = await this.toastController.create({
      message: `Measurement [${this.measurement}] submitted`,
      duration: 2000
    });
    toast.present();
  }
}
