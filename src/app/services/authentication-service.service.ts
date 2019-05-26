import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // TODO comment RO values
  private _ready: boolean = false;
  private _logged: boolean = false;
  private _providerName: string = undefined;
  private _providerToken: string = undefined;
  private _apiURL: string = undefined;

  constructor(private storage: Storage) { }

  login(name: string, token: string, apiURL: string) {
    this._providerName = name;
    this._providerToken = token;
    this._apiURL = apiURL;
    var provider_credentials = { 'name' : name, 'token' : token, 'apiURL': apiURL};
    this.storage.set('provider_credentials', provider_credentials);
    this._logged = true;
  }

  logout() {
    this.storage.remove('provider_credentials');
  }

  public checkLogin(): Observable<boolean> {

    return Observable.create((observer:any) => {
      if (!this._ready) {
        this.storage.get('provider_credentials').then(data => {

          this._ready = true;

          if (data != null) {
            this._providerName = data['name'];
            this._providerToken = data ['token'];
            this._apiURL = data['apiURL'];
    
            if (typeof this.providerName !== 'undefined' && this.providerName != null && this.providerName.length > 0 &&
            typeof this.providerToken !== 'undefined' && this.providerToken != null && this.providerToken.length > 0 && 
            typeof this.apiURL !== 'undefined' && this.apiURL != null && this.apiURL.length > 0) {
              
              this._logged = true;
              observer.next(true);

            } else {
              observer.next(false);
            }
          } else {
            observer.next(false);
          }
        });
      } else {
        observer.next(true);
      }
    });
   
  }
  
  public get logged(): boolean {
    return this._logged;
  }

  public get providerName(): string {
    return this._providerName;
  }

  public get providerToken(): string {
    return this._providerToken;
  }

  public get apiURL(): string {
    return this._apiURL;
  }
}
