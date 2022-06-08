import { BankTransaction } from './bankTransaction.model';

export class conto {
  numero_conto!: string;
  iban!: string;
  saldo!: number;
  id?: number;
  attivo!: boolean;

  constructor(saldo: number) {
    this.numero_conto = this.assegnaNumero();

    this.saldo = saldo;

    this.attivo = false;
  }

  assegnaNumero(): string {
    return '12345678910';
  }

  genIban(): string {
    return 'IT60 X054 2811 1010 0000 0123 456';
  }

  getTransaction(): BankTransaction[] {
    return null;
  }
}
