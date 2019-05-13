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

  public components: Array<CustomComponent>;
  public loaded = false;

  constructor (public router: Router, private modelService: ModelService, private storage: Storage) {
    
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

  navigateToComponent(id: string) {
    
    // TODO delete
    if (id.length < 1) {
        // set a key/value
      this.storage.set('provider', 'arevelproviuder');
    }
    
    this.router.navigate(['component-view',id]);


  }
}
