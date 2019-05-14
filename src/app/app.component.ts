import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
      title: 'Create component',
      action: 'createComponent',
      icon: 'add'
    },
    {
      title: 'Add measurement',
      action: 'addMeasurement',
      icon: 'stats'
    },
    {
      title: 'Log out',
      action: 'logout',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
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

  addCustomComponent() {
    this.router.navigate(['component-view','']);
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  execute(action: string) {
    switch (action) {
      case 'createComponent':
        this.addCustomComponent();
        break;
    
      case 'addMeasurement':
        console.log('not implemented')
        break;

     case 'logout':
        this.logOut();
        break;
      default:
        break;
    }
  }
}
