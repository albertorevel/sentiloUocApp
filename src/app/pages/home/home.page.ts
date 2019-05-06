import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ModelService } from 'src/app/services/model.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public sensors;
  public loaded = false;

  constructor (public router: Router, private modelService: ModelService) {
    
    modelService.findAllElements().subscribe(result => {
      if(result) {
        this.sensors = modelService.getAllSensors();
        this.loaded = true;
      }
    });
  }

  navigate(route: string, id: number, modify: boolean) {
    console.log(route+id+modify);
    this.router.navigate([route, id, modify]);
  }

  navigate2(id: string) {
    this.router.navigate(['sensor-view',id,false]);
  }
}
