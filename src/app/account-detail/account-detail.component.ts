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

  bankTransactions: BankTransaction[] = [
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '20/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '22222S/05/2020',
      amount: '100',
      recipient: 'SecretCase',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
    {
      type: 'Pagamento tramite Pos',
      date: '1111/05/2020',
      amount: '100',
      recipient: 'Mcdonald',
      description: "Pos Carta n.****10 C/O Mcdonald's Segrate",
    },
  ];

  // Methods

  constructor(
    private httpRequest: HttpRequestService,
    private spyMode: SpioneService
  ) {}

  ngOnInit(): void {
    // Modalità spione
    let isNotFirst = false;
    let i = 0;
    let amountArray = [];
    this.spyMode.bs.subscribe((spyModeBoolean) => {
      for (let bankTransaction of this.bankTransactions) {
        i++;
        amountArray.push(bankTransaction.amount);
        if (spyModeBoolean === false) {
          bankTransaction.amount = '**';
          isNotFirst = true;
        } else if (isNotFirst) {
          bankTransaction.amount = amountArray[i];
        }
      }
      i = 0;
    });
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
