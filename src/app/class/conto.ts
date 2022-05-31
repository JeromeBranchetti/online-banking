
export class conto {
  numero_conto!: string;
  iban!: string;
  saldo!: number;
      id?:number;
  attivo!: boolean;

  constructor(saldo: number) {
    this.numero_conto = this.assegnaNumero();

    this.saldo = saldo;

    this.attivo = false;
  }
  assegnaNumero(): string {
    return null;
  }


}
