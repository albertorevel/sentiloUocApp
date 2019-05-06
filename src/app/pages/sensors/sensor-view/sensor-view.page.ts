import { Component, OnInit } from '@angular/core';
import { Sensor } from 'src/app/model/sentilo/sensor';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-sensor-view',
  templateUrl: './sensor-view.page.html',
  styleUrls: ['./sensor-view.page.scss'],
})
export class SensorViewPage implements OnInit {

  sensor:Sensor
  modify:boolean

  constructor( private route: ActivatedRoute,
    private modelService: ModelService) { }

  ngOnInit() {

    this.modify = this.route.snapshot.paramMap.get('modify') === "true";
    var id = this.route.snapshot.paramMap.get('sensor-id');

    if (typeof id !== "undefined" && id != null) {
      this.sensor = this.modelService.getSensor(id);

      this.modelService.getMeasurements(id,10).subscribe(data => {
        console.log(data.data);
      });
      // TODO no se recupera?
    }
    else {
      id = ''
      this.sensor = new Sensor();
      this.modify = true;
    }
  }

}
