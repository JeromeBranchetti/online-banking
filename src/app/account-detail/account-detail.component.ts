import { TransactionService } from './../service/transaction.service';
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
    'Deposito',
    'Prelievo',
    'Bonifico',
    'Ricarica telefonica',
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
    this.onFilterNumberTransactionTen();
    this.transactionService.bankTransactionFlag.subscribe((res) => {
      this.bankTransactions = res;
      this.onCalculateAmount();
      for (let transaction of this.bankTransactions) {
        if (transaction.operationType === 'RICARICA_TELEFONICA') {
          transaction.operationType = 'RICARICA TELEFONICA';
        }
      }
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
        this.debitAmount = (+this.debitAmount - +bankTransaction.amount)
          .toFixed(2)
          .toString();
      } else if (+bankTransaction.amount > 0) {
        this.creditAmount = (+this.creditAmount + +bankTransaction.amount)
          .toFixed(2)
          .toString();
      }
    }
  }

  onFilterNumberTransactionTen() {
    if (this.selected === 'Prelievo') {
      this.httpReq.onGetTransactionFilterWithdrawal(
        this.httpReq.conto.id,
        'ten'
      );
    } else if (this.selected === 'Deposito') {
      this.httpReq.onGetTransactionFilterDeposit(this.httpReq.conto.id, 'ten');
    } else if (this.selected === 'Bonifico') {
      this.httpReq.onGetTransactionFilterTransfer(this.httpReq.conto.id, 'ten');
    } else if (this.selected === 'Ricarica telefonica') {
      this.httpReq.onGetTransactionFilterPhoneTopUp(
        this.httpReq.conto.id,
        'ten'
      );
    } else {
      this.httpReq.onGetTransactionFilteredTen();
    }
  }

  onFilterNumberTransactionTwenty() {
    if (this.selected === 'Prelievo') {
      this.httpReq.onGetTransactionFilterWithdrawal(
        this.httpReq.conto.id,
        'twenty'
      );
    } else if (this.selected === 'Deposito') {
      this.httpReq.onGetTransactionFilterDeposit(
        this.httpReq.conto.id,
        'twenty'
      );
    } else if (this.selected === 'Bonifico') {
      this.httpReq.onGetTransactionFilterTransfer(
        this.httpReq.conto.id,
        'twenty'
      );
    } else if (this.selected === 'Ricarica telefonica') {
      this.httpReq.onGetTransactionFilterPhoneTopUp(
        this.httpReq.conto.id,
        'twenty'
      );
    } else {
      this.httpReq.onGetTransactionFilteredTwenty();
    }
  }

  onFilterNumberTransactionFifty() {
    if (this.selected === 'Prelievo') {
      this.httpReq.onGetTransactionFilterWithdrawal(
        this.httpReq.conto.id,
        'fifty'
      );
    } else if (this.selected === 'Deposito') {
      this.httpReq.onGetTransactionFilterDeposit(
        this.httpReq.conto.id,
        'fifty'
      );
    } else if (this.selected === 'Bonifico') {
      this.httpReq.onGetTransactionFilterTransfer(
        this.httpReq.conto.id,
        'fifty'
      );
    } else if (this.selected === 'Ricarica telefonica') {
      this.httpReq.onGetTransactionFilterPhoneTopUp(
        this.httpReq.conto.id,
        'fifty'
      );
    } else {
      this.httpReq.onGetTransactionFilteredFifty();
    }
  }

  onFilterWord() {
    if (this.selected === 'Prelievo') {
      this.httpReq.onGetTransactionFilterWithdrawal(
        this.httpReq.conto.id,
        'ten'
      );
    } else if (this.selected === 'Deposito') {
      this.httpReq.onGetTransactionFilterDeposit(this.httpReq.conto.id, 'ten');
    } else if (this.selected === 'Bonifico') {
      this.httpReq.onGetTransactionFilterTransfer(this.httpReq.conto.id, 'ten');
    } else if (this.selected === 'Ricarica telefonica') {
      this.httpReq.onGetTransactionFilterPhoneTopUp(
        this.httpReq.conto.id,
        'ten'
      );
    }
  }

  onPrintTransaction() {
    this.httpReq.onGetTransaction();
    setTimeout(() => {
      /* pass here the table id */
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }, 100);
  }
}
