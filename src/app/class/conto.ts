import { BankTransaction } from './../account-detail/bankTransaction.model';
export class conto {
  numero_conto!: string;
  iban!: string;
  saldo!: number;
  Transaction!: BankTransaction[];
  attivo!: boolean;

  constructor(saldo: number) {
    this.numero_conto = this.assegnaNumero();
    this.iban = this.genIban();
    this.saldo = saldo;
    this.Transaction = this.getTransaction();
    this.attivo = false;
  }
  assegnaNumero(): string {
    return null;
  }
  genIban(): string {
    return '';
  }
  getTransaction(): BankTransaction[] {
    return null;
  }
}
