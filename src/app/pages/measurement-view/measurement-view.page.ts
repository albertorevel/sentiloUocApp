import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomComponent } from 'src/app/model/customComponent';
import { ModelService } from 'src/app/services/model.service';


@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.page.html',
  styleUrls: ['./measurement-view.page.scss'],
})
export class MeasurementViewPage implements OnInit {

  customComponent: CustomComponent;
  
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) { }

  ngOnInit() {

     // We read parameters and prepare data
     var id = this.route.snapshot.paramMap.get('component-id');

     if (typeof id !== "undefined" && id != null) {
       this.customComponent = this.modelService.getComponent(id);
     }
 
     if (typeof this.customComponent === "undefined" || this.customComponent == null) {
      id = null
      this.customComponent = new CustomComponent();
     }

    
  }

  sendMeasurements() {
    this.modelService.addMeasurements(this.customComponent.sensors.filter((value) => value.newMeasurement && value.newMeasurement.active));
  }

}
