import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/sentilo/customComponent';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public _components: Array<CustomComponent> = undefined;

  constructor (public router: Router, private modelService: ModelService, private storage: Storage) {
   
  }

  public get components() {
    return this.modelService.getAllComponents();
  }


  navigate(route: string, id: number, modify: boolean) {
    console.log(route+id+modify);
    this.router.navigate([route, id, modify]);
  }

  navigateToComponent(id: string) {
   
    this.router.navigate(['component-view',id]);


  }
}
