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
  
  // Opciones del menú lateral
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
     
      // Comprueba si hay datos guardados del usuario para intentar iniciar la sesión 
      // o mostrar la pantalla de autenticación
      this.authenticationService.checkLogin().subscribe(logged => {
        this.loadingCtrl.create({
          message: 'Cargando'
        }).then(loadingElement => {
          
          loadingElement.present();

          if (logged) {

            // Si hay datos guardados del usuario, intenta realizar una llamada para obtener los elementos del
            // proveedor asociado y comprobar así si estos datos son correctos
            this.modelService.findAllElements().subscribe(result => {
          
             
              if (result) {
                this.router.navigate(['home'],{ replaceUrl: true });
              } else {
                this.showToast('Ha ocurrido un error con el proceso de autenticación.'+
                ' Compruebe los datos introducidos y la conexión.');
                this.router.navigate(['login'],{ replaceUrl: true });
              }
            });

          } else {
            this.router.navigate(['login'],{ replaceUrl: true });
          }

          loadingElement.dismiss();
        });
      });
   });
  }

 /* ****************
  * Métodos del menú
  * **************** */

  /**
   * Dirige a la pantalla de creación de componente
   */
  addCustomComponent() {
    this.router.navigate(['component-view','']);
  }

  /**
   * Dirige a la pantalla de introducción de medidas
   */
  addMeasurements() {
    this.router.navigate(['measurement-view','',false]);
  }

  /**
   * Cierra la sesión iniciada y dirige a la pantalla de autenticación
   */
  logOut() {
    this.authenticationService.logout();
    pthis.modelService.clearData();
    this.router.navigate(['login'],{ replaceUrl: true });
  }

  /**
   * Ejecuta los métodos asociados a una serie de acciones, definidas para los elementos del menú
   */
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

  /**
   * Método que sirve para mostrar un mensaje de tipo toast en la aplicación.
   * El mensaje mostrado es el que se pasa como parámetro del método.
   */
  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000
    }).then(toastElement => {
      toastElement.present();
    });
  }
}
