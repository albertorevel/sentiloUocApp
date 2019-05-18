import { Component } from '@angular/core';

import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModelService } from './services/model.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public menuOptions = [
    {
      title: 'Crear componente',
      action: 'createComponent',
      icon: 'add'
    },
    {
      title: 'Añadir medición',
      action: 'addMeasurement',
      icon: 'stats'
    },
    {
      title: 'Cerrar sesión',
      action: 'logout',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private modelService: ModelService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

     
      this.statusBar.styleDefault();
     
      this.authenticationService.checkLogin().subscribe(logged => {
        this.loadingCtrl.create({
          message: 'Cargando'
        }).then(loadingElement => {
          
          loadingElement.present();

          if (logged) {

            this.modelService.findAllElements().subscribe(result => {
          
             
              if (result) {
                this.router.navigate(['home'],{ replaceUrl: true });
              } else {
                this.showToast('Ha ocurrido un error con el proceso de autenticación. Compruebe los datos introducidos y la conexión.');
                this.router.navigate(['login']);
              }
            });

          } else {
            this.router.navigate(['login']);
          }

          loadingElement.dismiss();
        });
      });
   });
  }

  addCustomComponent() {
    this.router.navigate(['component-view','']);
    
  }

  addMeasurements() {
    this.router.navigate(['measurement-view','',false]);
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['login'],{ replaceUrl: true });
  }

  execute(action: string) {
    switch (action) {
      case 'createComponent':
        this.addCustomComponent();
        break;
    
      case 'addMeasurement':
        this.addMeasurements();
        break;

     case 'logout':
        this.logOut();
        break;
      default:
        break;
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000
    }).then(toastElement => {
      toastElement.present();
    });
  }
}
