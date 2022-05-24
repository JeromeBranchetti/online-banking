import { conto } from './conto';
export class utente{
    nome!:string;
    cognome!:string;
    email!:string;
    password!:string;
    n_conto!:conto;
    attivo!:boolean;
    dipendente!:boolean;
    movimenti!:number;
    constructor(nome:string, cognome:string,email:string,password:string ){
        this.nome=nome;
        this.cognome=cognome;
        this.email=email;
        this.password=password;
        this.attivo=false;
        this.n_conto=new conto(0);
        this.dipendente=this.controlloDipendente();

    }
    
    controlloDipendente():boolean{
        return false;
    }

}