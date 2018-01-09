import { Livro } from '../models/livro';

export class Genero {

    constructor(
        public id: number = null,
        public nome: string = '',
        public livro: Livro = null
    ){}
}