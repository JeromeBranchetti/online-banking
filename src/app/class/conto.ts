export class conto{
    numero_conto!:string;
    iban!:string;
    saldo!:number;

    constructor(saldo:number){
        this.numero_conto=this.assegnaNumero();
        this.iban=this.genIban();
        this.saldo=saldo;

    }
    assegnaNumero():string{
        return null;
    }
    genIban():string{
        return ""
    }
}