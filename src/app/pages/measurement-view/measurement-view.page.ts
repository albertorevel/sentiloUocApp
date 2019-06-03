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
    // Leemos los parámetros y preparamos los datos del componente. Dependiendo de los datos que llegan,
    // se trata de la vista de las medidas tomadas o de la introducción de nuevas
    this.customComponentId = this.route.snapshot.paramMap.get('component-id');
    this.showing = this.route.snapshot.paramMap.get('showing') == 'true';
    this.customComponents = this.modelService.getAllComponents();
    this.wasShowing = this.showing;

    this.loadElements();
     
  }

  /**
   * Carga las medidas de los sensores del componente seleccionados
   */
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

      this.resetNewMeasurements();
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

  /**
   * Envía los datos de las medidas introducidos por el usuario.
   */
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

  /**
   * Habilita el modo de introducción de nuevas medidas.
   */
  addMeasurement() {
    this.showing = false;
  }

  /**
   * Cancela la introducción de nuevas medidas, volviendo al punto anterior.
   */
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

    this.resetNewMeasurements();
  }

  /**
   * Borra los datos introducidos por el usuario de nuevas medidas para los sensores mostrados
   */
  resetNewMeasurements() {
    if (typeof this.customComponent !== "undefined" && this.customComponent != null &&
        typeof this.customComponent.sensors !== "undefined" && this.customComponent.sensors != null ) {
          this.customComponent.sensors.forEach(sensor => {
            if (typeof sensor !== "undefined" && sensor != null ) {
              sensor.newMeasurement = new Measurement();
            }
          });
    }
  }

}
