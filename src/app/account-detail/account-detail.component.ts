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

  // Methods

  constructor(
    private spyMode: SpioneService,
    private httpReq: HttpRequestService
  ) {}

  ngOnInit(): void {
    this.onCalculateAmount();
    this.onPrivacyMode();
  }

  onPrivacyMode() {
    let isNotFirst = false;
    let i = 0;
    let amountTempArray = [];
    let creditTempAmount = this.creditAmount;
    let debitTempAmount = this.debitAmount;
    this.spyMode.bs.subscribe((spyModeBoolean) => {
      if (spyModeBoolean) {
        this.creditAmount = creditTempAmount;
        this.debitAmount = debitTempAmount;
      } else {
        this.creditAmount = '**';
        this.debitAmount = '**';
      }
      for (let bankTransaction of this.bankTransactions) {
        i++;
        amountTempArray.push(bankTransaction.amount);
        if (!spyModeBoolean) {
          bankTransaction.amount = '**';
          isNotFirst = true;
        } else if (isNotFirst) {
          bankTransaction.amount = amountTempArray[i];
        }
      }
      i = 0;
    });
  }

  onCalculateAmount() {
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

  onFilter(filter: number) {
    this.httpReq.onGetTransaction(this.idAccount, filter);
  }

  onPrintTransaction() {
    /* pass here the table id */
    let element = document.getElementById('transactionList');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
