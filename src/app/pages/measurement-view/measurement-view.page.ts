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
  showing: boolean;
  loading: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) {

    
   }

  ngOnInit() {



     // We read parameters and prepare data
     var id = this.route.snapshot.paramMap.get('component-id');
     this.showing = this.route.snapshot.paramMap.get('showing') == 'true';

     if (typeof id !== "undefined" && id != null) {
       this.customComponent = this.modelService.getComponent(id);

       this.modelService.getComponentMeasurements(this.customComponent).subscribe(data => {
        this.loading = false;
      });
     }
 
     if (typeof this.customComponent === "undefined" || this.customComponent == null) {
      id = null
      this.customComponent = new CustomComponent();
     }

     

     // TODO error

    
  }

  sendMeasurements() {
    this.modelService.addMeasurements(this.customComponent.sensors.filter((value) => value.newMeasurement && value.newMeasurement.active));
  }

}
