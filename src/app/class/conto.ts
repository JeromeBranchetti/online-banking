import { BankTransaction } from './bankTransaction.model';

export class conto {
  numero_conto!: number;
  iban!: string;
  saldo!: number;
  idUt?: number;
  attivo!: boolean;
  id?: number;

  constructor(saldo: number) {
    this.numero_conto = this.assegnaNumero();

    this.saldo = saldo;
    this.attivo = false;
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
