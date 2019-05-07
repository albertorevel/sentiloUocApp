import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/sentilo/customComponent';

@Component({
  selector: 'app-component-view',
  templateUrl: './component-view.page.html',
  styleUrls: ['./component-view.page.scss'],
})
export class ComponentViewPage implements OnInit {
  
  customComponent:CustomComponent
  modify:boolean

  constructor(
    public toastController: ToastController,
    private route: ActivatedRoute,
    private modelService: ModelService
    ) { }

  ngOnInit() {

    // We read parameters and prepare data
    this.modify = this.route.snapshot.paramMap.get('modify') === "true";
    var id = this.route.snapshot.paramMap.get('component-id');

    if (typeof id !== "undefined" && id != null) {
      this.customComponent = this.modelService.getComponent(id);
      //TODO error
    }
    else {
      id = null
      this.customComponent = new CustomComponent();
      this.modify = true;
    }

    console.log(this.customComponent);
  }

  async submit() {

    const toast = await this.toastController.create({
      message: `Component [${this.customComponent}] submitted`,
      duration: 2000
    });
    toast.present();
  }

}
