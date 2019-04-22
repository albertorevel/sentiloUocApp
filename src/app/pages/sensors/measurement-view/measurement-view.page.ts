import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Measurement } from 'src/model/measurement';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.page.html',
  styleUrls: ['./measurement-view.page.scss'],
})
export class MeasurementViewPage implements OnInit {

  measurement:Measurement
  modify:boolean
  id:number
  // nameInput:FormControl
  // dataInput:FormControl

  constructor(
    public toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

    // this.nameInput = new FormControl('', Validators.required)
    // this.dataInput = new FormControl(0, Validators.required)
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
    // this.modify = this.route.snapshot.paramMap.get('measurement-id')
    this.modify = this.route.snapshot.paramMap.get('modify') === "true"
    this.id = parseInt(this.route.snapshot.paramMap.get('measurement-id'), 10)
    console.log(this.route.snapshot)
    

  }

  async submit() {

    const toast = await this.toastController.create({
      message: `Measurement [${this.id}] submitted${this.measurement.name}with value: ${this.measurement.data}`,
      duration: 2000
    });
    toast.present();
  }
}
