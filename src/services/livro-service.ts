import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Livro } from '../models/livro';
import { Foto } from '../models/foto';
import { Autor } from '../models/autor';
import { Genero } from '../models/genero';

@Injectable()
export class LivroService {

    constructor(private _http: Http) { }


    procuraLivrosApi(titulo: string) {

        let livros = [];

        titulo = titulo.replace(/\s+/g,"+");

        console.log(titulo);
  
        let api = `https://www.googleapis.com/books/v1/volumes?q=${titulo}`;

        return this._http
            .get(api)
            .map(res => res.json())
            .toPromise()
            .then(dado => {
                
                if(dado.totalItems > 0){
                    dado.items.forEach(resposta => {

                        resposta = resposta.volumeInfo;

                        let livro = new Livro(
                            null,
                            resposta.title,
                            resposta.publisher,
                            resposta.publishedDate,
                            resposta.pageCount,
                            null,
                            null,
                            null,
                            resposta.description
                        );

                        let foto = null;
                        if(resposta.hasOwnProperty('imageLinks')){
                            if(resposta.imageLinks.hasOwnProperty('smallThumbnail')){
                                foto = new Foto(
                                    null,
                                    resposta.imageLinks.smallThumbnail,
                                    livro,
                                    1
                                );
                            }
                        }

                        let autor = null;
                        let autores = [];
                        
                        if(resposta.authors){
                            resposta.authors.forEach(elemento => {

                                autor = new Autor(
                                    null,
                                    elemento,
                                    livro
                                );

                                autores.push(autor);
                            });
                        }


                        let genero = null;
                        let generos = [];


                        if(resposta.categories){
                            resposta.categories.forEach(elemento => {

                                if (elemento) {
                                    genero = new Genero(
                                        null,
                                        elemento,
                                        livro
                                    );

                                    generos.push(genero);
                                }

                            });
                        }


                        livros.push({ 'livro': livro, 'foto': foto, 'autores': autores, 'generos': generos });

                    });

                }
                
                return livros;
              
            });
    }

    handleResponse(response){

        console.log('response');
        console.log(response);

    }
}