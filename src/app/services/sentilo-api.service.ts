import { Injectable, Inject } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG_TOKEN, MY_CONFIG, ApplicationProperties } from '../applicationProperties';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class SentiloApiService {

  
  constructor(private http: HttpClient, private nativeHttp: HTTP, @Inject(CONFIG_TOKEN) private config: ApplicationProperties) { }

  
}
