import { Livro } from '../models/livro';

export class Foto {
    
    constructor(
        public id: number = null,
        public foto: string = '',
        public livro: Livro = null,
        public tipo: number = null // '1' - capa do livro // '2' - Personagens 
    ){}
}