export class Livro {

    constructor(
        public id: number = null,
        public titulo: string = '',
        public editora: string = '',
        public dataPublicacao: string = new Date().toISOString(),
        public quantidadePagina: number = null,
        public categoria: number = null, // 1 - Lendo, 2 - Lido, 3 - Não Lido, 4 - Abandonado
        public literaturaEstrangeira: number = null, // 1 - Sim , 2 - Não 
        public favorito: number = null, // 1- SIM , 2 - NÃO
        public sinopse: string = ''
    ){}
}