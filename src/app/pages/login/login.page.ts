import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ModelService } from 'src/app/services/model.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private name: string;
  private token: string;

  constructor(
    public router: Router, 
    private authenticationService: AuthenticationService,
    private modelService: ModelService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  loginProvider() {
    this.authenticationService.checkLogin().subscribe(logged => {
      this.loadingCtrl.create({
        message: 'Cargando'
      }).then(loadingElement => {
        
        loadingElement.present();
        this.authenticationService.login(this.name, this.token);
        this.modelService.findAllElements().subscribe(result => {
          if(result) {
            this.router.navigate(['home'],{ replaceUrl: true });
            
          } else {
            this.toastCtrl.create({
              message: 'Ha ocurrido un error con el proceso de autenticación. Compruebe los datos introducidos y la conexión y vuélvalo a intentar.',
              duration: 7000
            }).then(toastElement => {
              toastElement.present();
            });
          }
          loadingElement.dismiss();
        });
      });
    });
  }
}
