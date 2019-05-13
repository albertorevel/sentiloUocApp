import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModelService } from './services/model.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './services/authentication-service.service';

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
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
     
      this.authenticationService.checkLogin().subscribe(logged => {

        if (logged) {
          
          this.modelService.findAllElements().subscribe(result => {
         
            
            if (result) {
              this.router.navigate(['home']);
            } else {
              // TODO error
            }
               
          });

        } else {
          this.router.navigate(['login']);
        }
      });
   });
  }
}
