import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomComponent } from 'src/app/model/customComponent';
import { ModelService } from 'src/app/services/model.service';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Measurement } from 'src/app/model/measurement';


@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.page.html',
  styleUrls: ['./measurement-view.page.scss'],
})
export class MeasurementViewPage implements OnInit {

  customComponent: CustomComponent;
  showing: boolean;
  wasShowing: boolean;
  customComponents: Array<CustomComponent>;
  customComponentId: string = '';
  loading: HTMLIonLoadingElement;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modelService: ModelService,
    public loadingCtrl: LoadingController,
    private appComponent: AppComponent,
    private location: Location
  ) {
   }

  ngOnInit() {
    // We read parameters and prepare data
    this.customComponentId = this.route.snapshot.paramMap.get('component-id');
    this.showing = this.route.snapshot.paramMap.get('showing') == 'true';
    this.customComponents = this.modelService.getAllComponents();
    this.wasShowing = this.showing;

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

          this.modelService.getComponentMeasurements(this.customComponent).subscribe(result => {
            if (!result) {
              this.appComponent.showToast('Ha ocurrido un error recuperando los datos. Compruebe los datos introducidos y la conexión.');
              this.router.navigate(['home'],{ replaceUrl: true });
            } 
            loadingElement.dismiss();
          });
        });

        
      }
    }

    if (typeof this.customComponent === "undefined" || this.customComponent == null) {
     
      if (this.showing) {
        // Ha ocurrido un error en la obtención de todos los datos
        this.appComponent.showToast('Ha ocurrido un error recuperando los datos. Compruebe la conexión.');
        this.router.navigate(['home'],{ replaceUrl: true });
      } else { 
        this.customComponent = new CustomComponent();
      }
    }
  }
  sendMeasurements() {
   
    this.loadingCtrl.create({
      message: 'Enviando'
    }).then(loadingElement => {
      loadingElement.present();
      this.modelService.addMeasurements(this.customComponent.sensors.filter((value) => value.newMeasurement && value.newMeasurement.active)).subscribe( data => {
        this.showing = true;
        this.loadElements();
        loadingElement.dismiss();
        this.appComponent.showToast('Datos añadidos correctamente.');
      },
      _error => {
        this.appComponent.showToast('Ha ocurrido un error enviando los datos. Compruebe los datos introducidos y la conexión.');
        loadingElement.dismiss();
      });
    });
  }

  addMeasurement() {
    this.showing = false;
  }

  cancelMeasurement() {

    // Eliminamos los cambios
    if (this.customComponent && this.customComponent.sensors && this.customComponent.sensors.length > 0) {
      this.customComponent.sensors.forEach(sensor => {
        sensor.newMeasurement = new Measurement();
      })
    }

    // Realizamos la navegación de manera correcta
    if (this.wasShowing) {
      this.showing = true;
    } else {
      this.location.back();
    }
  }

}
