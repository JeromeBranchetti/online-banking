import { TransactionService } from './../service/transaction.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BankTransaction } from './../class/bankTransaction.model';
import { SpioneService } from './../service/spione.service';
import { HttpRequestService } from './../service/httpRequest.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  // Variables

  fileName = 'TransactionList.xlsx';
  debitAmount: string = '0';
  creditAmount: string = '0';
  idAccount: number = 12345678912;
  transactionsType: string[] = [
    'deposit',
    'withkdrawal',
    'transfer',
    'phone top up',
  ];
  selected: string;

  bankTransactions: BankTransaction[] = [];

  spyModeBoolean: boolean = false;
  finishSubscribe: boolean = false;

  // Methods

  constructor(
    private spyMode: SpioneService,
    private transactionService: TransactionService,
    private httpReq: HttpRequestService
  ) {}

  ngOnInit(): void {
    this.transactionService.bankTransactionFlag.subscribe((res) => {
      this.bankTransactions = res;
      this.onCalculateAmount();
    });
    this.spyMode.bs.subscribe((res) => {
      this.spyModeBoolean = res;
    });
  }

  onCalculateAmount() {
    this.debitAmount = '0';
    this.creditAmount = '0';
    this.bankTransactions;
    for (let bankTransaction of this.bankTransactions) {
      if (+bankTransaction.amount < 0) {
        this.debitAmount = (
          +this.debitAmount - +bankTransaction.amount
        ).toString();
      } else if (+bankTransaction.amount > 0) {
        this.creditAmount = (
          +this.creditAmount + +bankTransaction.amount
        ).toString();
      }
    }
  }

  onFilterNumberTransaction(filter: number) {
    this.httpReq.onGetTransactionFiltered(filter);
  }

  onFilterWord() {
    this.httpReq.onGetTransactionFilteredWord(this.selected);
  }

  onPrintTransaction() {
    this.httpReq.onGetTransaction().subscribe((res) => {
      this.transactionService.bankTransactionFlag.next(res);
      setTimeout(() => {
        /* pass here the table id */
        let element = document.getElementById('transactionList');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
      }, 100);
    });
  }
}
