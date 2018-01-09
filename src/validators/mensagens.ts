
export class Mensagens {

    constructor(){
        return {
                'titulo': [
                    { type: 'required', message: 'Título é um campo obrigatório.' },
                    { type: 'minlength', message: 'Titulo deve ter no minimo 3 caracteres.' },
                    { type: 'maxlength', message: 'Titulo deve ter no maximo 250 caracteres.' },
                ],
                'autor': [
                    { type: 'required', message: 'Autor(a) é um campo obrigatório!' },
                    { type: 'maxlength', message: 'Autor(a) deve ter no maximo 250 caracteres.' },
                ],
                'editora': [
                    { type: 'maxlength', message: 'Editora deve ter no maximo 250 caracteres.' },
                ],
                'dataPublicacao': [
                    { type: 'maxlength', message: 'A data de Publicação deve estar no formato de data. Exemplo: dd/mm/YYYY' },
                ],
                'quantidadePagina': [
                    { type: 'pattern', message: 'Campo Quantidade de Páginas deve conter somente número.' }
                ]
          };
    }
}