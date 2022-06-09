import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BankTransaction } from './../class/bankTransaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  bankTransaction: BankTransaction[] = [];
  bankTransactionFlag = new BehaviorSubject<BankTransaction[]>([]);
}
