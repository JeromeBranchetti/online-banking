

import { conto } from './conto';
export class utente{
    name!:string;
    date!:string;
    last_name!:string;
    email!:string;
    password!:string;
    n_conto!:conto;
    attivo!:boolean;
    dipendente!:boolean;
    
    
    constructor(name:string, last_name:string,date:string,email:string,password:string ){
        this.name=name;
        this.date=date;
        this.last_name=last_name;
        this.email=email;
        this.password=password;
        this.attivo=false;
        this.n_conto=new conto(0);
        this.dipendente=this.controlloDipendente();
        
    }
    static factory(){
        let u=new utente("","","","","");
        return u;
    }
    controlloDipendente():boolean{
        return false;
    }
    remove(x:number){
        this.n_conto.saldo=this.n_conto.saldo-x;
    }

}