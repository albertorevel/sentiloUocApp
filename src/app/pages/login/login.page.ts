import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private name: string;
  private token: string;

  constructor(private storage: Storage, public router: Router) { }

  ngOnInit() {
  }

  loginProvider() {

    var provider_credentials = { 'name' : this.name, 'token' : this.token};
    this.storage.set('provider_credentials', provider_credentials);

    this.router.navigate(['home']);
  }
}
