import { Component } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor (public router: Router) {}

  navigate(route: string, id: number, modify: boolean) {
    console.log(route+id+modify);
    this.router.navigate([route, id, modify]);
  }
}
