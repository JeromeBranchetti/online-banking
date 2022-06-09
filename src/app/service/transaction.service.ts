import { Injectable } from '@angular/core';
import { BankTransaction } from './../class/bankTransaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  bankTransactions: BankTransaction[] = [];
}
