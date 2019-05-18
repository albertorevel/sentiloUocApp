import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomComponent } from 'src/app/model/customComponent';
import { ModelService } from 'src/app/services/model.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.page.html',
  styleUrls: ['./measurement-view.page.scss'],
})
export class MeasurementViewPage implements OnInit {

  customComponent: CustomComponent;
  showing: boolean;
  customComponents: Array<CustomComponent>;
  customComponentId: string = '';
  loading: HTMLIonLoadingElement;
  
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    public loadingCtrl: LoadingController
  ) {
   }

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
        
        this.loadingCtrl.create({
          message: 'Cargando'
        }).then(loadingElement => {
          loadingElement.present();

          this.modelService.getComponentMeasurements(this.customComponent).subscribe(data => {
            loadingElement.dismiss();
          });
        });

        
      }
    }

    if (typeof this.customComponent === "undefined" || this.customComponent == null) {
     this.customComponent = new CustomComponent();
    //  this.hideLoading();
     this.showing = false;
    }

    // TODO error
  }
  async sendMeasurements() {
   
    this.loadingCtrl.create({
      message: 'Cargando'
    }).then(loadingElement => {
      loadingElement.present();
      this.modelService.addMeasurements(this.customComponent.sensors.filter((value) => value.newMeasurement && value.newMeasurement.active)).subscribe( data => {
        this.showing = true;
        this.loadElements();
        loadingElement.dismiss();
      });
    });
  }

}
