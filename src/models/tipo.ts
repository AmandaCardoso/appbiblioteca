import { Livro } from '../models/livro';

export class Tipo {

     
    constructor(
        public id: number = null,
        public codigo: number = null, // 1 - Fisico, 2 - Ebook
        public livro: Livro = null
    ){}

}