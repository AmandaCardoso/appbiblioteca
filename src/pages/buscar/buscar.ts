import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import { LivroService } from '../../services/livro-service';
import { CadastroPage } from '../../pages/cadastro/cadastro';


@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {


  //FILTRO API LIVROS
  public searchControl: FormControl;
  public searching: boolean = false;
  public arrPesquisaLivrosApi = [];
  //public searchingNaoEncontrado = false;
  public tituloSearch: string = '';

  private _alerta: Alert;
  public _alertaConfirm: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _service: LivroService
  ) {

    this.searchControl = new FormControl();

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => { this.navCtrl.setRoot(BuscarPage) } }]
    });

  }

  ionViewDidLoad() {

    this.procuraLivrosApi();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      
      this.searching = false;
      this.procuraLivrosApi();

    });


  }

  onSearchInput() {
    if(this.tituloSearch.trim())
      this.searching = true;
  }

  procuraLivrosApi() {

    this.arrPesquisaLivrosApi = [];
    //this.searchingNaoEncontrado = false;

    if(this.tituloSearch.trim()){
      this._service
              .procuraLivrosApi(this.tituloSearch)
              .then(livros => {
                if(livros.length > 0){
                  this.arrPesquisaLivrosApi = livros;
                }else {
                  this._alertaConfirm = this.showConfirmAlert(() => { this.navCtrl.push(CadastroPage) });
                  this._alertaConfirm.setTitle('Confirmação');
                  this._alertaConfirm.setSubTitle('Livro não encontrado.<br/> Deseja cadastrar manualmente ?');
                  this._alertaConfirm.present();
                }
                //this.searchingNaoEncontrado = true;
              })
              .catch(erro => {
                  console.log(erro);
                  this._alerta.setSubTitle('Não foi possível realizar a pesquisa do Livro. Tente mais tarde ou cadastre manualmente.');
                  this._alerta.present();
              });
    }
  }

  preencherCampos(){}

  showConfirmAlert(acaoPrimeiroBotao){

    return this._alertCtrl.create({

      buttons: [
        {
          text: 'SIM',
          handler: acaoPrimeiroBotao
        },
        {
          text: 'NÃO',
          handler: () => {}
        }
      ]
    });

  }

}
