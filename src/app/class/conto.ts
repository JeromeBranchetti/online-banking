import { BankTransaction } from './bankTransaction.model';

export class conto {
  accountNumber!: number;
  balance!:number;
  iban?: string;
  id?: number;
  state!:any;
  userId:number;
 


  constructor(saldo: number) {
    this.accountNumber = this.assegnaNumero();

    this.balance = saldo;
    this.state = "state";
  }

  assegnaNumero(): number {
    let v = Math.random() * 100;
    v = Math.round(v);
    return v;
  }

  getTransaction(): BankTransaction[] {
    return null;
  }
}
