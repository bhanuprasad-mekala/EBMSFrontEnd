import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/Model/Bill';
import { Customer } from 'src/Model/Customer';
import { ViewBill } from 'src/Model/ViewBill';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  billsList: ViewBill[] = [];
  customers: Customer[] = [];
  bills: ViewBill[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getBills();
    this.getCustomers();
    this.billsList = this.bills;
  }

  getCustomers() {
    this.http.get<Customer[]>(environment.appUrl + "Customers").subscribe(data => {
      for (let i = 0; i < this.bills.length; i++) {
        let obj: Customer[] = data.filter(cust => cust.id == this.bills[i].CustomerNo);
        this.bills[i].CustomerName = obj[0].customerName
        this.bills[i].Address = obj[0].adress
        this.bills[i].DOB = obj[0].DOB
        this.bills[i].PinCode = obj[0].pincode
      }
    })
  }

  getBills() {
    this.http.get<Bill[]>(environment.appUrl + "Bills").subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let obj: ViewBill = {
          CustomerNo: data[i].custId,
          CustomerName: "",
          DOB: "",
          Address: "",
          PinCode: 0,
          Month: data[i].month,
          year: data[i].year,
          Noofunit: data[i].noOfUnits,
          Amount: data[i].amount
        }
        this.bills[i] = obj;
      }
    })
  }

  sortData(column: any) {
    if (column === 'custId') {
      this.bills.sort((a, b) => {
        return parseInt(a.CustomerNo, 10) - parseInt(b.CustomerNo, 10)
      })
    }
    else if (column === 'custName') {
      this.bills.sort((a, b) => {
        return a.CustomerName.localeCompare(b.CustomerName)
      })
    }
    if (column === 'month') {
      this.bills.sort((a, b) => {
        return a.Month.localeCompare(b.Month)
      })
    }
  }

  filterData(event: any) {
    let value = event.target.value
    let data = this.billsList.filter(
      bill => (bill.CustomerName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) ||
        (bill.CustomerNo.toString().includes(value)) ||
        (bill.Month.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    )
    this.bills = [];
    this.bills = [...data]
  }
}
