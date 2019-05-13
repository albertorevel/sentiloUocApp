import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ModelService } from 'src/app/services/model.service';

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
    private modelService: ModelService
  ) { }

  ngOnInit() { }

  loginProvider() {

    this.authenticationService.login(this.name, this.token);
    this.modelService.findAllElements().subscribe(result => {
      this.router.navigate(['home']);
    });
  }
}
