import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
//import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Livro } from '../../models/livro';
import { Foto } from '../../models/foto';
import { Autor } from '../../models/autor';
//import { Mensagens } from '../../validators/mensagens';
import { Helpers } from '../../helpers/helpers';
//import { AlertsUtils } from '../../utils/alerts-utils';

//NATIVOS
import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  styles: ['error-message{ color:red; }']
})
export class CadastroPage {

  //MODELS
  public livro: Livro;
  public foto: Foto;
  public autor: Autor;

  //VALIDAÇÃO
  //public cadastro: FormGroup;
  //public submitValido: boolean = false;
  //public mensagens: Mensagens;

  public checkedCategoria: number = 1;
  public ckeckedGenero = [];
  public listaGenero = [];

  private _alerta: Alert;
  private _alertCadstraGenero: Alert;
  private _alertGenero: Alert;
  // private _alertsUtils: AlertsUtils;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _datePicker: DatePicker,
    private _alertCtrl: AlertController
  ) {

    /* this.cadastro = this._formBuilder.group({
      'titulo': ['', Validators.compose([Validators.maxLength(250), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'autor': ['', Validators.compose([Validators.maxLength(250), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'editora': [''],
      'dataPublicacao': [''],
      'quantidadePagina': [''],
      'sinopse': ['']
      //age: ['', AgeValidator.isValid]
    }); */

    //this._validarCamposObrigatorios();

    this.livro = new Livro();
    this.autor = new Autor();

    //this.mensagens = new Mensagens();



    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => { this.navCtrl.setRoot(CadastroPage) } }]
    });

    //this._alertsUtils = new AlertsUtils(this._alertCtrl);

    // this._alerta = this._alertsUtils.showBasicoAlert(() =>{ this.navCtrl.setRoot(CadastroPage) });
  }

  selecionaDataPublicacao() {

    this._datePicker.show({
      date: new Date(), // vai mostrar com a data atual
      mode: 'date' //para tratar como uma data, como um tipo data, ele mostra só a data sem a hora
    })
      .then(data => {
        //e devolve um objeto data
        this.livro.dataPublicacao = data.toISOString(); // a data do agendamento é uma string , então tem que converter. Até que o componente ion-datetime espera uma string para exibir a data
      });
  }

  cadastraLivro() {
    /* this.submitValido = true;

    if (this.cadastro.valid) {

    } else {

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'O(s) campo(s) é(são) de preenchimento obrigatório!',
        buttons: [{ text: 'Ok' }]
      }).present();

      return;
    } */

  }

  /*  _validarCamposObrigatorios() {
 
     this.cadastro = new FormGroup({
       titulo: new FormControl('', Validators.compose([Validators.maxLength(250), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
       autor: new FormControl('', Validators.compose([Validators.maxLength(250), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
       editora: new FormControl('', Validators.maxLength(250)),
       dataPublicacao: new FormControl('',Validators.maxLength(10)),
       quantidadePagina: new FormControl('',Validators.pattern('[a-zA-Z ]*')),
       sinopse: new FormControl('')
     });
 
   } */



  showConfirmAlert(acaoPrimeiroBotao) {

    return this._alertCtrl.create({

      buttons: [
        {
          text: 'SIM',
          handler: acaoPrimeiroBotao
        },
        {
          text: 'NÃO',
          handler: () => { }
        }
      ]
    });

  }

  showCategoria() {

    let alert = this._alertCtrl.create();
    alert.setTitle('Categoria');

    alert.addInput({
      type: 'radio',
      label: 'Lido',
      value: '1',
      checked: this.checkedCategoria == 1 ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Lendo',
      value: '2',
      checked: this.checkedCategoria == 2 ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Não Lido',
      value: '3',
      checked: this.checkedCategoria == 3 ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Abandonado',
      value: '4',
      checked: this.checkedCategoria == 4 ? true : false
    });

    alert.addButton('Cancelar');

    alert.addButton({
      text: 'OK',
      handler: data => {
        this.checkedCategoria = data;
      }
    });
    alert.present();

  }

  


  showGenero() {

    this._alertGenero = this._alertCtrl.create();
    this._alertGenero.setTitle('Gênero');

    this._alertGenero.addInput({
      type: 'checkbox',
      label: 'Cadastrar Novo Gênero',
      value: '',
      handler: () => {
        this._alertGenero.dismiss();
        this.showCadastrarGenero();
      }
    });

    //ADICIONAR OS CHECKBOX DEPOIS DE CADASTRAR
    this.addCheckboxGeneroNaLista();

    this._alertGenero.addButton({
      text: 'Excluir',
      handler: data => {
        if (!this.excluirCheckboxGenero(data))
          return false;

        return true;
      }
    });

    this._alertGenero.addButton('Cancelar');

    this._alertGenero.addButton({
      text: 'OK',
      handler: data => {
        this.ckeckedGenero = [];
        this.ckeckedGenero = data;

      }
    });

    this._alertGenero.present();

  }

  addCheckboxGeneroNaLista() {
    let contador: number = 0;

    if (this.listaGenero.length > 0) {

      for (let i = 0; i < this.listaGenero.length; i++) {

        let ehCheckado = false;
        contador = i + 1;
        this.listaGenero[i].value = contador;

        if (this.ckeckedGenero.length > 0) {
          this.ckeckedGenero.filter(el => {
            if (el.indexOf(contador.toString()) == 0) {
              ehCheckado = true;
            }
          });
        }

        this._alertGenero.addInput(
          {
            type: 'ckeckbox',
            label: this.listaGenero[i].genero,
            value: contador.toString(),
            checked: ehCheckado
          });
      }

    }
  }

  showCadastrarGenero() {

    this._alertCadstraGenero = this._alertCtrl.create({

      title: 'Cadastrar Novo Gênero',
      inputs: [{
        name: 'cadastrarGenero',
        id: 'cadastrarGenero',
        placeholder: 'Gênero'
      }],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'OK',
          handler: data => {
            if (!this.validacoesCampoGenero(data.cadastrarGenero))
              return false;

            this.listaGenero.push({ genero: data.cadastrarGenero, value: 4, checked: false});
            this.showGenero();
          }
        }
      ]
    });

    this._alertCadstraGenero.present();

  }

  validacoesCampoGenero(valor) {

    if (!valor.trim()) {
      this._alertCadstraGenero.setMessage('Campo Gênero é obrigatório.').present();
      return;
    }

    if (valor.trim() && this.listaGenero.length > 0) {
      if (this.validaDuplicidadeGenero(valor).length > 0) {
        this._alertCadstraGenero.setMessage('O valor informado já existe na lista de Gêneros.').present();
        return;
      }
    }

    return true;
  }

  validaDuplicidadeGenero(valor) {

    valor = Helpers.dimunirLetraERemoverEspacos(valor);
    valor = Helpers.removerAcentos(valor);

    return this.listaGenero.filter(item => {

      item.genero = Helpers.dimunirLetraERemoverEspacos(item.genero);
      item.genero = Helpers.removerAcentos(item.genero);

      return item.genero.includes(valor);

    });

  }

  excluirCheckboxGenero(dados) {
    if (dados.length > 0) {

      this.listaGenero.filter((item, key) => {

        dados.filter(ele => {
          if (item.value == ele)
            this.listaGenero.splice(key, 1);
        })

      });

      return true;

    } else {
      this._alertGenero.setMessage('Precisa selecionar pelo menos um Gênero para poder excluir.').present();
      return;
    }
  }



}
