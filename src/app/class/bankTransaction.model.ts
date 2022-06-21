export class BankTransaction {
  type?: string;
  date?: string;
  amount: number;
  causal: string;
  destinationIban?: string;
  originIban?: string;
  accountId?: number;
  id?: number;
}
