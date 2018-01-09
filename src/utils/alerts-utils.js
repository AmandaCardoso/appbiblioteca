
import { AlertController, Alert } from 'ionic-angular';

export class AlertsUtils {


    constructor(private _alertCtrl: AlertController){
      this._alertCtrl = _alertCtrl;
    }

    showBasicoAlert(
        callback
    ) {

       return  this._alertCtrl.create({
            buttons: [{ 
                text: 'OK' , 
                handler: callback
            }]
          });

    }

    showConfirmAlert(
        acaoPrimeiroBotao,
        acaoSegundoBotao
    ) {

        this._alertCtrl.create({
          buttons: [
            {
              text: 'SIM',
              handler: acaoPrimeiroBotao
            },
            {
              text: 'NÃO',
              handler: acaoSegundoBotao
            }
          ]
        });

      }

}