
import { BankTransaction } from './bankTransaction.model';

export class conto {
  numero_conto!: number;
  iban!: string;
  saldo!: number;
  idUt?: number;
  attivo!: boolean;
  id?:number;

  constructor(saldo: number ) {
    this.numero_conto = this.assegnaNumero();

    this.saldo = saldo;
  this.iban=this.genIban();
    this.attivo = false;
    
  }

  assegnaNumero(): number {
    let v=Math.random()*100;
    v=Math.round(v)
    return v;
    

    
  }

  genIban(): string {
     let s='IT60 X054 2811 1010 0000 012' //+this.id.toString() +  this.idUt.toString();
    return s;
  }

  getTransaction(): BankTransaction[] {
    return null;
  }
}
