import { Livro } from '../models/livro';

export class Autor {

    constructor(
        public id: number = null,
        public nome: string = '',
        public livro: Livro = null
    ){}
}