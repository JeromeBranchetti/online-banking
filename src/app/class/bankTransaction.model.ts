export class BankTransaction {
  operationType?: string;
  data?: string;
  amount: number;
  causal: string;
  destinationIban?: string;
  originIban?: string;
  accountId?: number;
  id?: number;
}
