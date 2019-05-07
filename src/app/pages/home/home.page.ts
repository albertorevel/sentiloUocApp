import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/sentilo/customComponent';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public components: Array<CustomComponent>;
  public loaded = false;

  constructor (public router: Router, private modelService: ModelService) {
    
    // Recupera todos los elementos y desactiva el loading spinner cuando se han recuperado
    modelService.findAllElements().subscribe(result => {
      if(result) {
        this.components = modelService.getAllComponents();
        this.loaded = true;
      }
    });
  }

  navigate(route: string, id: number, modify: boolean) {
    console.log(route+id+modify);
    this.router.navigate([route, id, modify]);
  }

  navigate2(id: string) {
    this.router.navigate(['component-view',id,false]);
  }
}
