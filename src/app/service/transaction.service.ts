import { Injectable } from '@angular/core';
import { BankTransaction } from './../class/bankTransaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  bankTransactions: BankTransaction[] = [
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '+100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '+100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '-100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '22/05/2020',
      amount: '+100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '11/05/2020',
      amount: '+100',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
  ];
}
