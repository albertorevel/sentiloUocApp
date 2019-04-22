import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Measurement } from 'src/model/measurement';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.page.html',
  styleUrls: ['./measurement-view.page.scss'],
})
export class MeasurementViewPage implements OnInit {

  measurement:Measurement
  nameInput:FormControl
  dataInput:FormControl

  constructor(public toastController: ToastController) { }

  ngOnInit() {

    this.nameInput = new FormControl('', Validators.required)
    this.dataInput = new FormControl(0, Validators.required)
    // this.measurementGroup = this.formBuilder.group({
    //   nameInput: new FormControl('', Validators.required),
    //   dataInput: new FormControl(0, Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[0-9]+([\.,][0-9]+)')
    //   ]))
    // })
    // this.measurementGroup = new FormGroup({
    //   nameInput: new FormControl('', Validators.required),
    //   dataInput: new FormControl(0, Validators.required)
    // })

    this.measurement = new Measurement()

  }

  async submit() {
    console.log('Measurement submitted ' + this.measurement.name + ' with value: ' + this.measurement.data)

    const toast = await this.toastController.create({
      message: 'Measurement submitted ' + this.measurement.name + ' with value: ' + this.measurement.data,
      duration: 2000
    });
    toast.present();
  }
}
