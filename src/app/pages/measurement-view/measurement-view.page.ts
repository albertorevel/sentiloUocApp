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
  customComponents: Array<CustomComponent>;
  customComponentId: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) { }

  ngOnInit() {



     // We read parameters and prepare data
     this.customComponentId = this.route.snapshot.paramMap.get('component-id');
     this.showing = this.route.snapshot.paramMap.get('showing') == 'true';
     this.customComponents = this.modelService.getAllComponents();

     this.loadElements();
     
  }

  loadElements() {
    if (typeof this.customComponentId !== "undefined" && this.customComponentId != null && this.customComponentId.length > 0) {
      this.customComponent = this.modelService.getComponent(this.customComponentId);

      if (this.showing) {
        this.modelService.getComponentMeasurements(this.customComponent).subscribe(data => {
          this.loading = false;
        });
      }
    }

    if (typeof this.customComponent === "undefined" || this.customComponent == null) {
     this.customComponent = new CustomComponent();
     this.loading = false;
     this.showing = false;
    }

    // TODO error
  }
  sendMeasurements() {
    this.loading = true;
  
    this.modelService.addMeasurements(this.customComponent.sensors.filter((value) => value.newMeasurement && value.newMeasurement.active)).subscribe( data => {
     this.showing = true;
     this.loadElements();
    });
  }

}
