import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModelService } from './services/model.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Change password',
      url: '/change-password',
      icon: 'key'
    },
    {
      title: 'Log out',
      url: '/log-out',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modelService: ModelService,
    public router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.router.navigate(['home']);
      // this.splashScreen.hide();
      // Recupera todos los elementos y desactiva el loading spinner cuando se han recuperado
      this.modelService.findAllElements().subscribe(result => {
        if(result) {
          
           // Or to get a key/value pair
          this.storage.get('provider_credentials').then((val) => {
            if (typeof val === 'undefined' || val == null) {
              this.router.navigate(['login']);
            } else {
              this.router.navigate(['home']);
            }
            this.splashScreen.hide();
          });
          
        }
      });
      
   });
  }
}
