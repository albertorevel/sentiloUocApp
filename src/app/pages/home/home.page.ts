import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/customComponent';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public _components: Array<CustomComponent> = undefined;

  constructor (
    public router: Router, 
    private modelService: ModelService
  ) { }

  ngOnInit(): void { }

  /**
   * Devuelve la lista de componentes existente en el modelo de datos de la aplicación
   */
  public get components() {
    return this.modelService.getAllComponents();
  }

  /**
   * Dirige a la pantalla de vista del componente del id pasado como parámetro
   */
  navigateToComponent(id: string) {   
    this.router.navigate(['component-view',id]);
  }
}
