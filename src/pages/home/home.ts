import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { CadastroPage } from '../../pages/cadastro/cadastro';
import { BuscarPage } from '../../pages/buscar/buscar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController
  ) {}


  chamaPaginaCadastro() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cadastrar Livro',
      buttons: [
        {
          text: 'Buscar pelo título do livro',
          role: 'buscar',
          handler: () => {
            this.navCtrl.push(BuscarPage);
          }
        },{
          text: 'Cadastrar manualmente',
          handler: () => {
            this.navCtrl.push(CadastroPage);
          }
        },{
          text: 'Cancelar',
          role: 'cancelar'
        }
      ]
    });
    actionSheet.present();
  }


}
